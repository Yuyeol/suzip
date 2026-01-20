import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookmark, type Bookmark } from "@/shared/api/bookmarks";
import { bookmarkKeys, folderKeys } from "@/shared/utils/queryKeyFactory";

export function useDeleteBookmark() {
  const queryClient = useQueryClient();
  const listKey = [...bookmarkKeys.all, "list"];
  const folderListKey = [...folderKeys.all, "list"];

  return useMutation({
    mutationFn: deleteBookmark,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const prevLists = queryClient.getQueriesData<Bookmark[]>({
        queryKey: listKey,
      });

      queryClient.setQueriesData<Bookmark[]>({ queryKey: listKey }, (old) =>
        old?.filter((b) => b.id !== id),
      );

      return { prevLists };
    },

    onError: (_, __, ctx) => {
      ctx?.prevLists.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
    },

    onSuccess: () => {
      // 폴더에 속한 북마크 갯수 갱신을 위해 무효화 필요
      queryClient.invalidateQueries({ queryKey: folderListKey });
    },
  });
}
