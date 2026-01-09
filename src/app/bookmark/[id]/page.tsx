"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Text from "@/shared/components/core/text";
import { useGetBookmark } from "@/shared/hooks/queries/bookmarks/useGetBookmark";
import { useGetFolders } from "@/shared/hooks/queries/folders/useGetFolders";
import FavoriteButton from "@/shared/components/favorite-button";
import MoreButton from "@/shared/components/more-button";

export default function BookmarkDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: bookmark, isLoading } = useGetBookmark({ id });
  const { data: folders = [] } = useGetFolders({
    search: null,
    sort: null,
    order: null,
    is_favorite: null,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">로딩 중...</p>
      </div>
    );
  }

  if (!bookmark) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">북마크를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const folder = folders.find((f) => f.id === bookmark.folder_id);
  const formattedDate = new Date(bookmark.created_at)
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\. /g, ".")
    .replace(/\.$/, "");

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* 헤더 */}
      <div className="p-4 border-b border-border-light">
        {/* 제목 + 즐겨찾기 + 더보기 */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <Text variant="title-2">{bookmark.title}</Text>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <FavoriteButton
              entityType="bookmark"
              entityId={id}
              isFavorite={bookmark.is_favorite}
            />
            <MoreButton
              entityType="bookmark"
              entityId={id}
              onDeleteSuccess={() => router.push("/")}
            />
          </div>
        </div>
        {/* 폴더 | 날짜 */}
        <div className="flex items-center gap-2 text-sm text-muted">
          <Text variant="body-3" className="text-muted">
            {folder?.name || "main"}
          </Text>
          <span>|</span>
          <Text variant="body-3" className="text-muted">
            {formattedDate}
          </Text>
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="p-4 space-y-4">
        {/* URL */}
        <div className="flex flex-col gap-2">
          <Text variant="body-3" className="text-muted">
            URL
          </Text>
          <Link
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary"
          >
            <Text variant="body-2">{bookmark.url}</Text>
            <ExternalLink size={16} />
          </Link>
        </div>

        {/* 썸네일 */}
        {bookmark.thumbnail && (
          <div className="flex flex-col gap-2">
            <Text variant="body-3" className="text-muted">
              썸네일
            </Text>
            <div className="relative rounded-lg overflow-hidden border border-border-light h-48">
              <Image
                src={bookmark.thumbnail}
                alt={bookmark.title}
                className="object-cover"
                fill
              />
            </div>
          </div>
        )}

        {/* 설명 */}
        {bookmark.description && (
          <div className="flex flex-col gap-2">
            <Text variant="body-3" className="text-muted">
              설명
            </Text>
            <Text variant="body-2">{bookmark.description}</Text>
          </div>
        )}

        {/* 메모 */}
        {bookmark.memo && (
          <div className="flex flex-col gap-2">
            <Text variant="body-3" className="text-muted">
              메모
            </Text>
            <Text variant="body-2">{bookmark.memo}</Text>
          </div>
        )}
      </div>
    </div>
  );
}
