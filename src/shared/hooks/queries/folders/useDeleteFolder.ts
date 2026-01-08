import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFolder } from "@/shared/api/folders";
import { folderKeys } from "@/shared/utils/queryKeyFactory";

export function useDeleteFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteFolder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: folderKeys.all });
    },
  });
}
