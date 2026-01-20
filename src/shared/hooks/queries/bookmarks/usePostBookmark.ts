import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postBookmark,
  type Bookmark,
  type BookmarkPostRequest,
} from "@/shared/api/bookmarks";
import { bookmarkKeys, folderKeys } from "@/shared/utils/queryKeyFactory";

export function usePostBookmark() {
  const queryClient = useQueryClient();
  const listKey = [...bookmarkKeys.all, "list"];

  return useMutation({
    mutationFn: (request: BookmarkPostRequest) => postBookmark(request),

    // 서버 요청 전: 캐시 즉시 업데이트
    onMutate: async (request) => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const prevLists = queryClient.getQueriesData<Bookmark[]>({
        queryKey: listKey,
      });

      const tempBookmark: Bookmark = {
        id: `temp-${Date.now()}`,
        title: request.title,
        url: request.url,
        description: request.description ?? null,
        folder_id: request.folder_id ?? null,
        is_favorite: request.is_favorite ?? false,
        thumbnail: request.thumbnail ?? null,
        memo: request.memo ?? null,
        user_id: "", // 임시값
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      queryClient.setQueriesData<Bookmark[]>({ queryKey: listKey }, (old) =>
        old ? [tempBookmark, ...old] : [tempBookmark],
      );

      return { prevLists };
    },

    // 실패 시: 롤백
    onError: (_, __, ctx) => {
      ctx?.prevLists.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
    },

    // 성공 시: 실제 데이터 반영 및 무효화 (폴더 카운트 갱신 포함)
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: folderKeys.all,
      });
    },
  });
}
