"use client";

import { useState } from "react";
import { useGetFolders } from "@/shared/hooks/queries/folders/useGetFolders";
import { usePatchFolder } from "@/shared/hooks/queries/folders/usePatchFolder";
import { useDeleteFolder } from "@/shared/hooks/queries/folders/useDeleteFolder";
import Input from "@/shared/components/core/input";
import Button from "@/shared/components/core/button";

export default function FolderList() {
  const { data: folders = [], isLoading } = useGetFolders({
    search: null,
    sort: null,
    order: null,
    is_favorite: null,
  });
  const patchFolder = usePatchFolder();
  const deleteFolder = useDeleteFolder();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditValue(name);
  };

  const handleSaveEdit = (id: string) => {
    if (editValue.trim()) {
      patchFolder.mutate(
        { id, request: { name: editValue } },
        {
          onSuccess: () => {
            setEditingId(null);
            setEditValue("");
          },
        }
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleDelete = (id: string) => {
    deleteFolder.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (folders.length === 0) {
    return (
      <div className="text-center py-8 text-muted">
        <p>폴더가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="flex items-center justify-between px-4 py-3 border border-border-light rounded-lg bg-background"
        >
          {editingId === folder.id ? (
            // 수정 모드
            <>
              <div className="flex-1 flex gap-2">
                <Input
                  name="editFolderName"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="폴더명 입력..."
                  maxLength={50}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  onClick={() => handleSaveEdit(folder.id)}
                  disabled={!editValue.trim()}
                >
                  수정 완료
                </Button>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 text-sm text-muted"
                >
                  취소
                </button>
              </div>
            </>
          ) : (
            // 일반 모드
            <>
              <div className="flex items-center gap-2">
                <span>📁</span>
                <span className="text-foreground">
                  {folder.name} ({folder.bookmark_count ?? 0})
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(folder.id, folder.name)}
                  className="px-3 py-1 text-sm text-primary"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(folder.id)}
                  className="px-3 py-1 text-sm text-danger"
                >
                  삭제
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
