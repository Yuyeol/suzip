import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchFolder, FolderPatchRequest } from "@/shared/api/folders";
import { folderKeys } from "@/shared/utils/queryKeyFactory";

export function usePatchFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: FolderPatchRequest;
    }) => patchFolder(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: folderKeys.all });
    },
  });
}
