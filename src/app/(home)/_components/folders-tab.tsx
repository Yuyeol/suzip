"use client";

import FolderCard from "@/app/(home)/_components/folder-card";
import { useGetFolders } from "@/shared/hooks/queries/folders/useGetFolders";

export default function FoldersTab() {
  const { data: folders = [], isLoading: isFoldersLoading } = useGetFolders();

  return (
    <div className="grid grid-cols-2 gap-3">
      {isFoldersLoading ? (
        <p className="col-span-2 text-center text-muted">로딩 중...</p>
      ) : folders.length === 0 ? (
        <p className="col-span-2 text-center text-muted">폴더가 없습니다</p>
      ) : (
        folders.map((folder) => (
          <FolderCard
            key={folder.id}
            id={folder.id}
            name={folder.name}
            itemCount={folder.bookmark_count ?? 0}
          />
        ))
      )}
    </div>
  );
}
