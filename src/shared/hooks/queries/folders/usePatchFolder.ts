import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  patchFolder,
  type Folder,
  type FolderPatchRequest,
} from "@/shared/api/folders";
import { folderKeys } from "@/shared/utils/queryKeyFactory";

export function usePatchFolder() {
  const queryClient = useQueryClient();
  const listKey = [...folderKeys.all, "list"];

  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: FolderPatchRequest;
    }) => patchFolder(id, request),

    // 서버 요청 전: 캐시 즉시 업데이트 (낙관적 업데이트)
    onMutate: async ({ id, request }) => {
      await queryClient.cancelQueries({ queryKey: listKey });

      // 롤백용 이전 상태 백업
      const prevLists = queryClient.getQueriesData<Folder[]>({
        queryKey: listKey,
      });

      // 목록 캐시 즉시 업데이트
      queryClient.setQueriesData<Folder[]>({ queryKey: listKey }, (old) =>
        old?.map((f) => (f.id === id ? { ...f, ...request } : f)),
      );

      return { prevLists };
    },

    // 실패 시: 이전 상태로 롤백
    onError: (_, __, ctx) => {
      ctx?.prevLists.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
    },

    // 성공 시: 폴더명이 바뀌었을 수 있으므로 북마크 목록 무효화 (UI 정합성)
    onSuccess: (_, { request }) => {
      if (request.name) {
        queryClient.invalidateQueries({
          queryKey: ["bookmarks"],
        });
      }
    },
  });
}
