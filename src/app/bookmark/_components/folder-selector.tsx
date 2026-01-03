"use client";

import { useState } from "react";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { useGetFolders } from "@/shared/hooks/queries/folders/useGetFolders";

interface Folder {
  id: string;
  name: string;
}

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

export default function FolderSelector<T extends FieldValues>({
  name,
  control,
}: Props<T>) {
  const { data: folders = [], isLoading } = useGetFolders({ sort: null, order: null });
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "폴더를 선택해주세요" }}
      render={({ field, fieldState }) => (
        <FolderSelectorContent
          folders={folders.map((folder) => ({
            id: folder.id,
            name: folder.name,
          }))}
          selectedFolderId={field.value}
          onSelectFolder={field.onChange}
          error={fieldState.error}
          isLoading={isLoading}
        />
      )}
    />
  );
}

interface FolderSelectorContentProps {
  folders: Folder[];
  selectedFolderId?: string;
  onSelectFolder: (folderId: string | undefined) => void;
  error?: FieldError;
  isLoading?: boolean;
}

function FolderSelectorContent({
  folders,
  selectedFolderId,
  onSelectFolder,
  error,
  isLoading,
}: FolderSelectorContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedFolder = folders.find((f) => f.id === selectedFolderId);

  const handleSelectFolder = (folderId: string | undefined) => {
    onSelectFolder(folderId);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">폴더</label>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={`flex items-center justify-between w-full px-4 py-3 border rounded-lg bg-background text-foreground ${
          error ? "border-danger" : "border-border-light"
        }`}
      >
        <span className="text-sm">
          {selectedFolder ? `📁 ${selectedFolder.name}` : "폴더 없음"}
        </span>
        <ChevronDown size={16} className="text-muted" />
      </button>

      {/* 모달 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-background rounded-lg p-6 w-80 max-w-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              {/* 폴더 없음 옵션 */}
              <button
                type="button"
                onClick={() => handleSelectFolder(undefined)}
                className="flex items-center gap-3 w-full text-left py-2"
              >
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    !selectedFolderId
                      ? "border-primary bg-primary"
                      : "border-border-light"
                  }`}
                >
                  {!selectedFolderId && (
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                  )}
                </span>
                <span className="text-sm text-foreground">폴더 없음</span>
              </button>

              {/* 폴더 목록 */}
              {isLoading ? (
                <p className="text-sm text-muted text-center py-2">
                  로딩 중...
                </p>
              ) : folders.length === 0 ? (
                <p className="text-sm text-muted text-center py-2">
                  폴더가 없습니다
                </p>
              ) : (
                folders.map((folder) => (
                  <button
                    key={folder.id}
                    type="button"
                    onClick={() => handleSelectFolder(folder.id)}
                    className="flex items-center gap-3 w-full text-left py-2"
                  >
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedFolderId === folder.id
                          ? "border-primary bg-primary"
                          : "border-border-light"
                      }`}
                    >
                      {selectedFolderId === folder.id && (
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                      )}
                    </span>
                    <span className="text-sm text-foreground">
                      {folder.name}
                    </span>
                  </button>
                ))
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-6 py-2 bg-muted-light text-foreground rounded-lg"
            >
              닫기
            </button>
          </div>
        </div>
      )}
      {error?.message && (
        <p className="mt-1 text-sm text-danger">{error.message}</p>
      )}
    </div>
  );
}
