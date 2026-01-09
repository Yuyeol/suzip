"use client";

import { useRouter } from "next/navigation";
import BookmarkCardHeader from "@/app/(home)/_components/bookmark-card/bookmark-card-header";
import BookmarkCardContent from "@/app/(home)/_components/bookmark-card/bookmark-card-content";

interface Props {
  id: string;
  title: string;
  url: string;
  description?: string;
  createdAt: string;
  platform: string;
  thumbnail?: string;
  isFavorite: boolean;
}

export default function BookmarkCard({
  id,
  title,
  description,
  thumbnail,
  isFavorite,
}: Props) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/bookmark/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full p-4 border border-border-light rounded-lg bg-background cursor-pointer"
    >
      <div className="flex flex-col gap-2">
        {/* 1행: 제목 | 즐겨찾기&더보기 */}
        <BookmarkCardHeader
          title={title}
          bookmarkId={id}
          isFavorite={isFavorite}
        />

        {/* 2행: 이미지 | 디스크립션 */}
        <BookmarkCardContent
          thumbnail={thumbnail}
          description={description}
          title={title}
        />
      </div>
    </div>
  );
}
