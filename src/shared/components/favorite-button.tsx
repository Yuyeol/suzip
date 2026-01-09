"use client";

import { Star } from "lucide-react";
import { usePostFavorite } from "@/shared/hooks/queries/bookmarks/usePostFavorite";
import { usePostFolderFavorite } from "@/shared/hooks/queries/folders/usePostFolderFavorite";

interface Props {
  entityType: "bookmark" | "folder";
  entityId: string;
  isFavorite: boolean;
}

export default function FavoriteButton({
  entityType,
  entityId,
  isFavorite,
}: Props) {
  const toggleBookmarkFavorite = usePostFavorite();
  const toggleFolderFavorite = usePostFolderFavorite();

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    const toggleMutation =
      entityType === "bookmark" ? toggleBookmarkFavorite : toggleFolderFavorite;

    toggleMutation.mutate(entityId, {
      onSuccess: () => {
        // 성공 시 React Query가 자동으로 목록 갱신
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <button className="flex items-center" onClick={handleFavoriteToggle}>
      <Star
        size={20}
        className={
          isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted"
        }
      />
    </button>
  );
}
