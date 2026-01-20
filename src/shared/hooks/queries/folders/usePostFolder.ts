import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postFolder,
  type Folder,
  type FolderPostRequest,
} from "@/shared/api/folders";
import { folderKeys } from "@/shared/utils/queryKeyFactory";

export function usePostFolder() {
  const queryClient = useQueryClient();
  const listKey = [...folderKeys.all, "list"];

  return useMutation({
    mutationFn: (request: FolderPostRequest) => postFolder(request),

    // 서버 요청 전: 캐시 즉시 업데이트
    onMutate: async (request) => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const prevLists = queryClient.getQueriesData<Folder[]>({
        queryKey: listKey,
      });

      const tempFolder: Folder = {
        id: `temp-${Date.now()}`,
        name: request.name,
        bookmark_count: 0,
        is_favorite: false,
        user_id: "", // 임시값
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      queryClient.setQueriesData<Folder[]>({ queryKey: listKey }, (old) =>
        old ? [tempFolder, ...old] : [tempFolder],
      );

      return { prevLists };
    },

    // 실패 시: 롤백
    onError: (_, __, ctx) => {
      ctx?.prevLists.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
    },

    // 성공 시: 실제 데이터 반영 및 무효화
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: folderKeys.all,
      });
    },
  });
}
