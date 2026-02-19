import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFavorite, type Bookmark, type InfiniteBookmarks } from "@/shared/api/bookmarks";
import { bookmarkKeys } from "@/shared/utils/queryKeyFactory";

export function usePostFavorite() {
  const queryClient = useQueryClient();
  const listKey = [...bookmarkKeys.all, "list"];

  return useMutation({
    mutationFn: postFavorite,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const prevLists = queryClient.getQueriesData<InfiniteBookmarks>({ queryKey: listKey });
      const prevDetail = queryClient.getQueryData<Bookmark>(bookmarkKeys.detail(id));

      queryClient.setQueriesData<InfiniteBookmarks>({ queryKey: listKey }, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            items: page.items.map((b) =>
              b.id === id ? { ...b, is_favorite: !b.is_favorite } : b,
            ),
          })),
        };
      });

      if (prevDetail) {
        queryClient.setQueryData(bookmarkKeys.detail(id), {
          ...prevDetail,
          is_favorite: !prevDetail.is_favorite,
        });
      }

      return { prevLists, prevDetail, id };
    },

    onError: (_, __, ctx) => {
      ctx?.prevLists.forEach(([key, data]) => queryClient.setQueryData(key, data));
      if (ctx?.prevDetail) {
        queryClient.setQueryData(bookmarkKeys.detail(ctx.id), ctx.prevDetail);
      }
    },
  });
}
