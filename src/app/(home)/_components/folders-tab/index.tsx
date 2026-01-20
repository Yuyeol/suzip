"use client";

import { useGetFolders } from "@/shared/hooks/queries/folders/useGetFolders";
import { useQueryParam } from "@/shared/hooks/useQueryParam";
import { parseAsBoolean } from "@/shared/utils/queryStateParsers";
import { useState } from "react";
import { useDeleteFolder } from "@/shared/hooks/queries/folders/useDeleteFolder";
import FolderForm from "@/shared/components/folder/folder-form";
import FolderListItem from "./folder-card";

export default function FoldersTab() {
  const search = useQueryParam("search");
  const sort = useQueryParam("sort");
  const isFavorite = useQueryParam("is_favorite", undefined, parseAsBoolean);

  const [editingId, setEditingId] = useState<string | null>(null);

  const deleteFolder = useDeleteFolder();

  const getSortParams = () => {
    switch (sort) {
      case "latest":
        return { sort: "created_at", order: "desc" as const };
      case "oldest":
        return { sort: "created_at", order: "asc" as const };
      case "name":
        return { sort: "name", order: "asc" as const };
      default:
        return { sort: "created_at", order: "desc" as const };
    }
  };

  const sortParams = getSortParams();

  const { data: folders = [], isLoading: isFoldersLoading } = useGetFolders({
    search,
    ...sortParams,
    is_favorite: isFavorite,
  });

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleEditSuccess = () => {
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id: string, itemCount: number) => {
    let confirmMessage = "정말 삭제하시겠습니까?";
    if (itemCount > 0) {
      confirmMessage = `${itemCount}개의 북마크가 저장되어 있습니다. 폴더를 삭제하시겠습니까?\n(북마크는 삭제되지 않고 '폴더 없음'으로 이동합니다.)`;
    }

    if (confirm(confirmMessage)) {
      deleteFolder.mutate(id);
    }
  };

  if (isFoldersLoading) {
    return <p className="text-center text-muted py-8">로딩 중...</p>;
  }

  return (
    <div className="space-y-2">
      {/* 수정 중이 아닐 때만 상단 생성 폼 표시 */}
      {!editingId && <FolderForm mode="create" />}

      {folders.length === 0 ? (
        <p className="text-center text-muted py-8">폴더가 없습니다</p>
      ) : (
        folders.map((folder) =>
          editingId === folder.id ? (
            <FolderForm
              key={folder.id}
              mode="edit"
              editId={folder.id}
              initialValue={folder.name}
              onSuccess={handleEditSuccess}
              onCancel={handleCancel}
            />
          ) : (
            <FolderListItem
              key={folder.id}
              folder={folder}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={deleteFolder.isPending}
            />
          ),
        )
      )}
    </div>
  );
}
