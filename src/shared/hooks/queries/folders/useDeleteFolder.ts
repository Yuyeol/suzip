import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFolder, type Folder } from "@/shared/api/folders";
import { folderKeys, bookmarkKeys } from "@/shared/utils/queryKeyFactory";

export function useDeleteFolder() {
  const queryClient = useQueryClient();
  const listKey = [...folderKeys.all, "list"];
  const bookmarkListKey = [...bookmarkKeys.all, "list"];

  return useMutation({
    mutationFn: deleteFolder,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const prevLists = queryClient.getQueriesData<Folder[]>({
        queryKey: listKey,
      });

      queryClient.setQueriesData<Folder[]>({ queryKey: listKey }, (old) =>
        old?.filter((f) => f.id !== id),
      );

      return { prevLists };
    },

    onError: (_, __, ctx) => {
      ctx?.prevLists.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
    },

    onSuccess: () => {
      // 해당 폴더에 속한 북마크는 folder_id가 null이 됨을 즉시 반영하기 위해 무효화
      queryClient.invalidateQueries({ queryKey: bookmarkListKey });
    },
  });
}
