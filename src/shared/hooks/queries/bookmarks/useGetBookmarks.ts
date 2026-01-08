import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "@/shared/api/bookmarks";
import { bookmarkKeys } from "@/shared/utils/queryKeyFactory";

export function useGetBookmarks(params: {
  search: string | null;
  sort: string | null;
  order: "asc" | "desc" | null;
  folder_id: string | null;
  is_favorite: boolean | null;
}) {
  return useQuery({
    queryKey: bookmarkKeys.list(params),
    queryFn: () => getBookmarks(params),
  });
}
