import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFavorite, type Bookmark } from "@/shared/api/bookmarks";
import { bookmarkKeys } from "@/shared/utils/queryKeyFactory";

export function usePostFavorite() {
  const queryClient = useQueryClient();
  const listKey = [...bookmarkKeys.all, "list"];

  return useMutation({
    mutationFn: postFavorite,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const prevLists = queryClient.getQueriesData<Bookmark[]>({ queryKey: listKey });
      const prevDetail = queryClient.getQueryData<Bookmark>(bookmarkKeys.detail(id));

      // 목록 캐시 업데이트
      queryClient.setQueriesData<Bookmark[]>({ queryKey: listKey }, (old) =>
        old?.map((b) => (b.id === id ? { ...b, is_favorite: !b.is_favorite } : b)),
      );

      // 상세 캐시 업데이트
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
