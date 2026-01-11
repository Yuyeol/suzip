"use client";

import { useGetFolders } from "@/shared/hooks/queries/folders/useGetFolders";
import { useQueryParam } from "@/shared/hooks/useQueryParam";
import { parseAsBoolean } from "@/shared/utils/queryStateParsers";
import { useState } from "react";
import { usePostFolder } from "@/shared/hooks/queries/folders/usePostFolder";
import { usePatchFolder } from "@/shared/hooks/queries/folders/usePatchFolder";
import { useDeleteFolder } from "@/shared/hooks/queries/folders/useDeleteFolder";
import FolderForm from "./folder-form";
import FolderListItem from "./folder-card";

export default function FoldersTab() {
  const search = useQueryParam("search");
  const sort = useQueryParam("sort");
  const isFavorite = useQueryParam("is_favorite", undefined, parseAsBoolean);

  const [createValue, setCreateValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const postFolder = usePostFolder();
  const patchFolder = usePatchFolder();
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

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (createValue.trim()) {
      postFolder.mutate(
        { name: createValue },
        { onSuccess: () => setCreateValue("") }
      );
    }
  };

  const handleEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditValue(name);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editValue.trim() && editingId) {
      patchFolder.mutate(
        { id: editingId, request: { name: editValue } },
        {
          onSuccess: () => {
            setEditingId(null);
            setEditValue("");
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue("");
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
      <FolderForm
        value={editingId ? editValue : createValue}
        onChange={editingId ? setEditValue : setCreateValue}
        onSubmit={editingId ? handleSaveEdit : handleCreate}
        placeholder={editingId ? "폴더명 입력..." : "새 폴더 추가..."}
        buttonText={
          editingId
            ? patchFolder.isPending
              ? "수정 중..."
              : "수정"
            : postFolder.isPending
            ? "추가 중..."
            : "추가"
        }
        isLoading={editingId ? patchFolder.isPending : postFolder.isPending}
        onCancel={editingId ? handleCancel : undefined}
      />

      {folders.length === 0 ? (
        <p className="text-center text-muted py-8">폴더가 없습니다</p>
      ) : (
        folders.map((folder) =>
          editingId === folder.id ? null : (
            <FolderListItem
              key={folder.id}
              folder={folder}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={deleteFolder.isPending}
            />
          )
        )
      )}
    </div>
  );
}
