import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFolderFavorite, type Folder } from "@/shared/api/folders";
import { folderKeys } from "@/shared/utils/queryKeyFactory";

export function usePostFolderFavorite() {
  const queryClient = useQueryClient();
  const listKey = [...folderKeys.all, "list"];

  return useMutation({
    mutationFn: postFolderFavorite,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const prevLists = queryClient.getQueriesData<Folder[]>({ queryKey: listKey });

      queryClient.setQueriesData<Folder[]>({ queryKey: listKey }, (old) =>
        old?.map((f) => (f.id === id ? { ...f, is_favorite: !f.is_favorite } : f)),
      );

      return { prevLists };
    },

    onError: (_, __, ctx) => {
      ctx?.prevLists.forEach(([key, data]) => queryClient.setQueryData(key, data));
    },
  });
}
