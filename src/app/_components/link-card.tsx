'use client';

import { Star, MoreVertical } from 'lucide-react';

type LinkCardProps = {
  id: string;
  title: string;
  url: string;
  description?: string;
  createdAt: string;
  platform: string;
  thumbnail?: string;
  isFavorite: boolean;
};

export default function LinkCard({
  title,
  description,
  createdAt,
  platform,
  thumbnail,
  isFavorite,
}: LinkCardProps) {
  const handleCardClick = () => {
    // TODO: /items/[id] 페이지로 이동
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: 즐겨찾기 토글 API 호출
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: 더보기 드롭다운 표시 (수정/삭제)
  };

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
            <p className="text-sm text-muted mb-2 line-clamp-1">{description}</p>
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
            <button
              onClick={handleFavoriteToggle}
            >
              <Star
                size={20}
                className={isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}
              />
            </button>
            <button
              onClick={handleMoreClick}
              className="text-muted"
            >
              <MoreVertical size={20} />
            </button>
          </div>

          {/* 하단: 썸네일 */}
          {thumbnail && (
            <div className="w-16 h-16 rounded-md overflow-hidden bg-muted-light">
              <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
