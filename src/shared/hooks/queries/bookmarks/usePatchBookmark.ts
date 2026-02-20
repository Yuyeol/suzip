import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  patchBookmark,
  type Bookmark,
  type BookmarkPatchRequest,
  type InfiniteBookmarks,
} from "@/shared/api/bookmarks";
import { bookmarkKeys, folderKeys } from "@/shared/utils/queryKeyFactory";

export function usePatchBookmark() {
  const queryClient = useQueryClient();
  const listKey = [...bookmarkKeys.all, "list"];
  const folderListKey = [...folderKeys.all, "list"];

  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: BookmarkPatchRequest;
    }) => patchBookmark(id, request),

    onMutate: async ({ id, request }) => {
      await queryClient.cancelQueries({ queryKey: listKey });

      const prevLists = queryClient.getQueriesData<InfiniteBookmarks>({
        queryKey: listKey,
      });
      const prevDetail = queryClient.getQueryData<Bookmark>(
        bookmarkKeys.detail(id),
      );
      const hasFolderChange = request.folder_id !== undefined;
      const hasThumbnailChange = request.thumbnail !== undefined;

      queryClient.setQueriesData<InfiniteBookmarks>({ queryKey: listKey }, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            items: page.items.map((b) =>
              b.id === id ? { ...b, ...request } : b,
            ),
          })),
        };
      });

      if (prevDetail) {
        queryClient.setQueryData(bookmarkKeys.detail(id), {
          ...prevDetail,
          ...request,
        });
      }

      return { prevLists, prevDetail, id, hasFolderChange, hasThumbnailChange };
    },

    onError: (_, __, ctx) => {
      ctx?.prevLists.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
      if (ctx?.prevDetail) {
        queryClient.setQueryData(bookmarkKeys.detail(ctx.id), ctx.prevDetail);
      }
    },

    onSuccess: (_, __, ctx) => {
      if (ctx?.hasFolderChange) {
        queryClient.invalidateQueries({ queryKey: folderListKey });
        queryClient.invalidateQueries({ queryKey: listKey });
      } else if (ctx?.hasThumbnailChange) {
        queryClient.invalidateQueries({ queryKey: listKey });
      }
    },
  });
}
