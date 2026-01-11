interface Props {
  folderId: string;
  folderName: string;
  onEdit: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export default function FolderActions({
  folderId,
  folderName,
  onEdit,
  onDelete,
  isDeleting,
}: Props) {
  return (
    <>
      {/* 수정 버튼 */}
      <button
        onClick={() => onEdit(folderId, folderName)}
        className="px-1 py-1 text-sm text-primary flex-shrink-0"
      >
        수정
      </button>
      <div className="w-[0.5px] h-4 bg-gray-400" />
      {/* 삭제 버튼 */}
      <button
        onClick={() => onDelete(folderId)}
        className="px-1 py-1 text-sm text-danger flex-shrink-0"
        disabled={isDeleting}
      >
        삭제
      </button>
    </>
  );
}
