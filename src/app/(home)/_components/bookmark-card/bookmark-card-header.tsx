import FavoriteButton from "@/shared/components/favorite-button";
import MoreButton from "@/shared/components/more-button";

interface Props {
  title: string;
  bookmarkId: string;
  isFavorite: boolean;
}

export default function BookmarkCardHeader({
  title,
  bookmarkId,
  isFavorite,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <h3 className="text-base font-semibold text-foreground truncate flex-1">
        {title}
      </h3>
      <div className="flex items-center gap-2 flex-shrink-0">
        <FavoriteButton
          entityType="bookmark"
          entityId={bookmarkId}
          isFavorite={isFavorite}
        />
        <MoreButton entityType="bookmark" entityId={bookmarkId} />
      </div>
    </div>
  );
}
