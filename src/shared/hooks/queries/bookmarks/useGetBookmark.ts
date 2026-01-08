import { useQuery } from "@tanstack/react-query";
import { getBookmark } from "@/shared/api/bookmarks";
import { bookmarkKeys } from "@/shared/utils/queryKeyFactory";

export function useGetBookmark({ id }: { id: string }) {
  return useQuery({
    queryKey: bookmarkKeys.detail(id),
    queryFn: () => getBookmark(id),
    enabled: !!id,
  });
}
