"use client";

import { useRouter } from "next/navigation";
import { buildUrlWithParams } from "@/shared/utils/buildUrlWithParams";
import MoreButton from "@/shared/components/more-button";
import FavoriteButton from "@/shared/components/favorite-button";

interface Props {
  id: string;
  name: string;
  itemCount: number;
  isFavorite: boolean;
}

export default function FolderCard({ id, name, itemCount, isFavorite }: Props) {
  const router = useRouter();

  const handleCardClick = () => {
    // 전체보기 탭으로 전환 + 해당 폴더 필터링
    router.push(buildUrlWithParams("/", { folder_id: id }));
  };

  return (
    <div
      onClick={handleCardClick}
      className="p-4 border border-border-light rounded-lg bg-background cursor-pointer h-24 flex flex-col justify-between"
    >
      {/* 상단: 폴더명 & 즐겨찾기 & 더보기 */}
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-foreground line-clamp-1">
          {name}
        </h3>
        <div className="flex items-center gap-2 flex-shrink-0">
          <FavoriteButton
            entityType="folder"
            entityId={id}
            isFavorite={isFavorite}
          />
          <MoreButton entityType="folder" entityId={id} itemCount={itemCount} />
        </div>
      </div>

      {/* 하단: 개수 */}
      <div>
        <span className="text-xs text-muted">{itemCount}개</span>
      </div>
    </div>
  );
}
