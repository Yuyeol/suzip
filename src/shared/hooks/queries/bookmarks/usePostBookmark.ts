import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postBookmark,
  type Bookmark,
  type BookmarkPostRequest,
  type InfiniteBookmarks,
} from "@/shared/api/bookmarks";
import { bookmarkKeys, folderKeys } from "@/shared/utils/queryKeyFactory";

export function usePostBookmark() {
  const queryClient = useQueryClient();
  const listKey = [...bookmarkKeys.all, "list"];

  return useMutation({
    mutationFn: (request: BookmarkPostRequest) => postBookmark(request),

    onMutate: async (request) => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const prevLists = queryClient.getQueriesData<InfiniteBookmarks>({
        queryKey: listKey,
      });

      const tempBookmark: Bookmark = {
        id: `temp-${Date.now()}`,
        title: request.title,
        url: request.url,
        description: request.description ?? null,
        folder_id: request.folder_id ?? null,
        is_favorite: request.is_favorite ?? false,
        thumbnail: request.thumbnail ?? null,
        memo: request.memo ?? null,
        user_id: "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      queryClient.setQueriesData<InfiniteBookmarks>(
        { queryKey: listKey },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page, index) =>
              index === 0
                ? { ...page, items: [tempBookmark, ...page.items] }
                : page,
            ),
          };
        },
      );

      return { prevLists };
    },

    onError: (_, __, ctx) => {
      ctx?.prevLists.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookmarkKeys.all });
      queryClient.invalidateQueries({ queryKey: folderKeys.all });
    },
  });
}
