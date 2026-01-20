import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  patchBookmark,
  type Bookmark,
  type BookmarkPatchRequest,
} from "@/shared/api/bookmarks";
import { bookmarkKeys, folderKeys } from "@/shared/utils/queryKeyFactory";

export function usePatchBookmark() {
  const queryClient = useQueryClient();
  const listKey = [...bookmarkKeys.all, "list"];
  const folderListKey = [...folderKeys.all, "list"];

  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: BookmarkPatchRequest;
    }) => patchBookmark(id, request),

    // 서버 요청 전: 캐시 즉시 업데이트 (낙관적 업데이트)
    onMutate: async ({ id, request }) => {
      await queryClient.cancelQueries({ queryKey: listKey });

      // 롤백용 이전 상태 백업
      const prevLists = queryClient.getQueriesData<Bookmark[]>({
        queryKey: listKey,
      });
      const prevDetail = queryClient.getQueryData<Bookmark>(
        bookmarkKeys.detail(id),
      );
      const hasFolderChange = request.folder_id !== undefined;

      // 목록 캐시 즉시 업데이트
      queryClient.setQueriesData<Bookmark[]>({ queryKey: listKey }, (old) =>
        old?.map((b) => (b.id === id ? { ...b, ...request } : b)),
      );

      // 상세 캐시 즉시 업데이트
      if (prevDetail) {
        queryClient.setQueryData(bookmarkKeys.detail(id), {
          ...prevDetail,
          ...request,
        });
      }

      return { prevLists, prevDetail, id, hasFolderChange };
    },

    // 실패 시: 이전 상태로 롤백
    onError: (_, __, ctx) => {
      ctx?.prevLists.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
      if (ctx?.prevDetail) {
        queryClient.setQueryData(bookmarkKeys.detail(ctx.id), ctx.prevDetail);
      }
    },

    // 성공 시: 폴더 변경했으면 폴더 및 북마크 목록 무효화
    onSuccess: (_, __, ctx) => {
      if (ctx?.hasFolderChange) {
        queryClient.invalidateQueries({ queryKey: folderListKey });
        queryClient.invalidateQueries({ queryKey: listKey });
      }
    },
  });
}
