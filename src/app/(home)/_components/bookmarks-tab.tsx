"use client";

import BookmarkCard from "@/app/(home)/_components/bookmark-card";
import { useGetBookmarks } from "@/shared/hooks/queries/bookmarks/useGetBookmarks";
import { useQueryParam } from "@/shared/hooks/useQueryParam";
import { parseAsBoolean } from "@/shared/utils/queryStateParsers";

export default function BookmarksTab() {
  const search = useQueryParam("search");
  const folderId = useQueryParam("folder_id");
  const sort = useQueryParam("sort");
  const isFavorite = useQueryParam("is_favorite", undefined, parseAsBoolean);

  // Sort 값에 따라 sort, order 파라미터 결정
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

  const { data: bookmarks = [], isLoading: isBookmarksLoading } =
    useGetBookmarks({
      search,
      folder_id: folderId,
      sort: sortParams.sort,
      order: sortParams.order,
      is_favorite: isFavorite,
    });

  return (
    <div className="space-y-3">
      {isBookmarksLoading ? (
        <p className="text-center text-muted">로딩 중...</p>
      ) : bookmarks.length === 0 ? (
        <p className="text-center text-muted">북마크가 없습니다</p>
      ) : (
        bookmarks.map((bookmark) => (
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
        ))
      )}
    </div>
  );
}
