import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFavorite } from "@/shared/api/bookmarks";
import { bookmarkKeys } from "@/shared/utils/queryKeyFactory";

export function usePostFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookmarkKeys.all });
    },
  });
}
