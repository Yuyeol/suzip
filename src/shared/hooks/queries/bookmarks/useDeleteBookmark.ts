import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookmark } from "@/shared/api/bookmarks";
import { bookmarkKeys } from "@/shared/utils/queryKeyFactory";

export function useDeleteBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBookmark(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookmarkKeys.all });
    },
  });
}
