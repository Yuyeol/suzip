import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFolder, FolderPostRequest } from "@/shared/api/folders";
import { folderKeys } from "@/shared/utils/queryKeyFactory";

export function usePostFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: FolderPostRequest) => postFolder(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: folderKeys.all });
    },
  });
}
