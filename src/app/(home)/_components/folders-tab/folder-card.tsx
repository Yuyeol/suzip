import { useRouter } from "next/navigation";
import { buildUrlWithParams } from "@/shared/utils/buildUrlWithParams";
import FavoriteButton from "@/shared/components/favorite-button";
import FolderActions from "./folder-actions";
import { Folder } from "@/shared/api/folders";

interface Props {
  folder: Folder;
  onEdit: (id: string) => void;
  onDelete: (id: string, itemCount: number) => void;
  isDeleting: boolean;
}

export default function FolderListItem({
  folder,
  onEdit,
  onDelete,
  isDeleting,
}: Props) {
  const router = useRouter();

  const handleFolderClick = () => {
    // 전체보기 탭으로 전환 + 해당 폴더 필터링
    router.replace(buildUrlWithParams("/", { folder_id: folder.id }));
  };

  return (
    <div className="flex items-center gap-1 px-4 py-3 border border-border-light rounded-lg bg-background">
      {/* 폴더명 + 개수 (클릭 가능) */}
      <div
        onClick={handleFolderClick}
        className="flex-1 cursor-pointer min-w-0"
      >
        <div className="flex items-baseline gap-2">
          <h3 className="text-base font-semibold text-foreground truncate">
            {folder.name}
          </h3>
          <span className="text-xs text-muted flex-shrink-0">
            {folder.bookmark_count}개
          </span>
        </div>
      </div>

      {/* 즐겨찾기 토글 */}
      <FavoriteButton
        entityType="folder"
        entityId={folder.id}
        isFavorite={folder.is_favorite}
      />

      {/* 수정/삭제 버튼 */}
      <FolderActions
        folderId={folder.id}
        onEdit={onEdit}
        onDelete={() => onDelete(folder.id, folder.bookmark_count)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
