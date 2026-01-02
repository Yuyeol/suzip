"use client";

import { Star, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import Dropdown, { DropdownOption } from "@/shared/components/core/dropdown";
import Image from "next/image";

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
  createdAt,
  platform,
  thumbnail,
  isFavorite,
}: Props) {
  const router = useRouter();

  const handleCardClick = () => {
    // TODO: /bookmark/[id] 페이지로 이동
    router.push(`/bookmark/${id}`);
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: 즐겨찾기 토글 API 호출
  };

  const dropdownOptions: DropdownOption[] = [
    {
      label: "수정",
      value: "edit",
      onClick: () => router.push(`/bookmark/${id}/edit`),
    },
    {
      label: "삭제",
      value: "delete",
      variant: "danger",
      onClick: () => {
        // TODO: 삭제 확인 모달 + API 호출
        console.log("삭제:", id);
      },
    },
  ];

  return (
    <div
      onClick={handleCardClick}
      className="w-full p-4 border border-border-light rounded-lg bg-background cursor-pointer"
    >
      <div className="flex gap-3">
        {/* 왼쪽: 메인 콘텐츠 */}
        <div className="flex-1 min-w-0">
          {/* 제목 */}
          <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2">
            {title}
          </h3>

          {/* URL 미리보기/설명 */}
          {description && (
            <p className="text-sm text-muted mb-2 line-clamp-1">
              {description}
            </p>
          )}

          {/* 날짜 | 플랫폼 */}
          <div className="flex items-center gap-2 text-xs text-muted">
            <span>{createdAt}</span>
            <span>|</span>
            <span>{platform}</span>
          </div>
        </div>

        {/* 오른쪽: 액션 & 썸네일 */}
        <div className="flex flex-col items-end justify-between">
          {/* 상단: 별표 & 더보기 */}
          <div className="flex items-center gap-2">
            <button onClick={handleFavoriteToggle}>
              <Star
                size={20}
                className={
                  isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted"
                }
              />
            </button>
            <Dropdown
              trigger={
                <button className="text-muted">
                  <MoreVertical size={20} />
                </button>
              }
              options={dropdownOptions}
            />
          </div>

          {/* 하단: 썸네일 */}
          {thumbnail && (
            <div className="w-16 h-16 rounded-md overflow-hidden bg-muted-light">
              <Image
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
