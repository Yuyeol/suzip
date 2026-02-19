import { useInfiniteQuery } from "@tanstack/react-query";
import { getBookmarks } from "@/shared/api/bookmarks";
import { bookmarkKeys } from "@/shared/utils/queryKeyFactory";
import { QUERY_CONFIG } from "@/shared/constants/queryConfig";

export function useGetBookmarks(params: {
  search: string | null;
  sort: string | null;
  order: "asc" | "desc" | null;
  folder_id: string | null;
  is_favorite: boolean | null;
}) {
  return useInfiniteQuery({
    queryKey: bookmarkKeys.list(params),
    queryFn: ({ pageParam }) =>
      getBookmarks({ ...params, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, limit, total } = lastPage;
      return page * limit < total ? page + 1 : undefined;
    },
    ...QUERY_CONFIG.BOOKMARKS,
  });
}
