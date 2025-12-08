'use client';

import { MoreVertical } from 'lucide-react';

type FolderCardProps = {
  id: string;
  name: string;
  itemCount: number;
};

export default function FolderCard({ name, itemCount }: FolderCardProps) {
  const handleCardClick = () => {
    // TODO: 해당 폴더로 필터링 (전체보기 탭으로 전환 + folder ID 파라미터)
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: 더보기 드롭다운 표시 (수정/삭제)
  };

  return (
    <div
      onClick={handleCardClick}
      className="p-4 border border-border-light rounded-lg bg-background cursor-pointer h-24 flex flex-col justify-between"
    >
      {/* 상단: 폴더명 & 더보기 */}
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-foreground line-clamp-1">{name}</h3>
        <button
          onClick={handleMoreClick}
          className="text-muted flex-shrink-0"
        >
          <MoreVertical size={16} />
        </button>
      </div>

      {/* 하단: 개수 */}
      <div>
        <span className="text-xs text-muted">{itemCount}개</span>
      </div>
    </div>
  );
}
