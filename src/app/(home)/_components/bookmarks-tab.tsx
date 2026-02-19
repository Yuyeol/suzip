"use client";

import { useInView } from "react-intersection-observer";
import BookmarkCard from "@/app/(home)/_components/bookmark-card";
import { useGetBookmarks } from "@/shared/hooks/queries/bookmarks/useGetBookmarks";
import { useQueryParam } from "@/shared/hooks/useQueryParam";
import { parseAsBoolean } from "@/shared/utils/queryStateParsers";
import { PulseLoader } from "react-spinners";

export default function BookmarksTab() {
  const search = useQueryParam("search");
  const folderId = useQueryParam("folder_id");
  const sort = useQueryParam("sort");
  const isFavorite = useQueryParam("is_favorite", undefined, parseAsBoolean);

  const getSortParams = () => {
    switch (sort) {
      case "latest":
        return { sort: "created_at", order: "desc" as const };
      case "oldest":
        return { sort: "created_at", order: "asc" as const };
      case "name":
        return { sort: "title", order: "asc" as const };
      default:
        return { sort: "created_at", order: "desc" as const };
    }
  };

  const sortParams = getSortParams();

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetBookmarks({
      search,
      folder_id: folderId,
      sort: sortParams.sort,
      order: sortParams.order,
      is_favorite: isFavorite,
    });

  const { ref } = useInView({
    threshold: 0.1,
    onChange: (inView) => {
      if (inView && hasNextPage) fetchNextPage();
    },
  });

  const bookmarks = (data?.pages ?? []).flatMap((page) => page.items);

  return (
    <div className="space-y-3">
      {isLoading ? (
        <div className="flex justify-center py-20">
          <PulseLoader color="var(--color-primary)" size={10} />
        </div>
      ) : bookmarks.length === 0 ? (
        <p className="text-center text-muted">북마크가 없습니다</p>
      ) : (
        <>
          {bookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              id={bookmark.id}
              title={bookmark.title}
              url={bookmark.url}
              description={bookmark.description || ""}
              createdAt={new Date(bookmark.created_at)
                .toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\. /g, ".")
                .replace(/\.$/, "")}
              platform={new URL(bookmark.url).hostname}
              thumbnail={bookmark.thumbnail || undefined}
              isFavorite={bookmark.is_favorite}
            />
          ))}
          <div ref={ref} className="py-4 flex justify-center">
            {isFetchingNextPage && (
              <PulseLoader color="var(--color-primary)" size={10} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
