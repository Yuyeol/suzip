import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBookmark } from "@/shared/api/bookmarks";
import { bookmarkKeys, folderKeys } from "@/shared/utils/queryKeyFactory";
import type { BookmarkPostRequest } from "@/shared/api/bookmarks";

export function usePostBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: BookmarkPostRequest) => postBookmark(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.all,
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: folderKeys.all,
        refetchType: "active",
      });
    },
  });
}
