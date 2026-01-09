import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFolder } from "@/shared/api/folders";
import { folderKeys, bookmarkKeys } from "@/shared/utils/queryKeyFactory";

export function useDeleteFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteFolder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: folderKeys.all,
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.all,
        refetchType: "active",
      });
    },
  });
}
