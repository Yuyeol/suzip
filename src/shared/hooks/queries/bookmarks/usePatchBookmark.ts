import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchBookmark } from "@/shared/api/bookmarks";
import { bookmarkKeys } from "@/shared/utils/queryKeyFactory";
import type { BookmarkPatchRequest } from "@/shared/api/bookmarks";

export function usePatchBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: BookmarkPatchRequest }) =>
      patchBookmark(id, request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: bookmarkKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: bookmarkKeys.all });
    },
  });
}
