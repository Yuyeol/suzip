import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFolderFavorite } from "@/shared/api/folders";
import { folderKeys } from "@/shared/utils/queryKeyFactory";

export function usePostFolderFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postFolderFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: folderKeys.all,
        refetchType: "active",
      });
    },
  });
}
