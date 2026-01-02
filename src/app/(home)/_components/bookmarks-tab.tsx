"use client";

import BookmarkCard from "@/app/(home)/_components/bookmark-card";
import { useGetBookmarks } from "@/shared/hooks/queries/bookmarks/useGetBookmarks";

export default function BookmarksTab() {
  const { data: bookmarks = [], isLoading: isBookmarksLoading } =
    useGetBookmarks();

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
            thumbnail=""
            isFavorite={bookmark.is_favorite}
          />
        ))
      )}
    </div>
  );
}
