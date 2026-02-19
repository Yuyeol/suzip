import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookmark, type InfiniteBookmarks } from "@/shared/api/bookmarks";
import { bookmarkKeys, folderKeys } from "@/shared/utils/queryKeyFactory";

export function useDeleteBookmark() {
  const queryClient = useQueryClient();
  const listKey = [...bookmarkKeys.all, "list"];
  const folderListKey = [...folderKeys.all, "list"];

  return useMutation({
    mutationFn: deleteBookmark,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const prevLists = queryClient.getQueriesData<InfiniteBookmarks>({
        queryKey: listKey,
      });

      queryClient.setQueriesData<InfiniteBookmarks>({ queryKey: listKey }, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            items: page.items.filter((b) => b.id !== id),
          })),
        };
      });

      return { prevLists };
    },

    onError: (_, __, ctx) => {
      ctx?.prevLists.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
    },

    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: bookmarkKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: listKey });
      queryClient.invalidateQueries({ queryKey: folderListKey });
    },
  });
}
