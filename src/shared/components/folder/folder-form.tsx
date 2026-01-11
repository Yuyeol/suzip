"use client";

import { useState } from "react";
import Input from "@/shared/components/core/input";
import Button from "@/shared/components/core/button";
import { usePostFolder } from "@/shared/hooks/queries/folders/usePostFolder";
import { usePatchFolder } from "@/shared/hooks/queries/folders/usePatchFolder";

interface Props {
  mode?: "create" | "edit";
  editId?: string;
  initialValue?: string;
  onSuccess?: (folderId?: string) => void;
  onCancel?: () => void;
  placeholder?: string;
}

export default function FolderForm({
  mode = "create",
  editId,
  initialValue = "",
  onSuccess,
  onCancel,
  placeholder = "새 폴더 추가...",
}: Props) {
  const [value, setValue] = useState(initialValue);
  const postFolder = usePostFolder();
  const patchFolder = usePatchFolder();

  const isLoading =
    mode === "create" ? postFolder.isPending : patchFolder.isPending;

  const handleSubmit = () => {
    if (!value.trim()) return;

    if (mode === "create") {
      postFolder.mutate(
        { name: value },
        {
          onSuccess: (data) => {
            setValue("");
            onSuccess?.(data.id);
          },
        }
      );
    } else if (mode === "edit" && editId) {
      patchFolder.mutate(
        { id: editId, request: { name: value } },
        {
          onSuccess: () => {
            setValue("");
            onSuccess?.();
          },
        }
      );
    }
  };

  const buttonText =
    mode === "create"
      ? postFolder.isPending
        ? "추가 중..."
        : "추가"
      : patchFolder.isPending
      ? "수정 중..."
      : "수정";

  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex-1">
        <Input
          name="folderName"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder={placeholder}
          maxLength={50}
        />
      </div>
      <div className="flex items-center gap-1">
        {onCancel && (
          <Button
            type="button"
            variant="neutral"
            onClick={onCancel}
            disabled={isLoading}
          >
            취소
          </Button>
        )}
        <Button
          type="button"
          variant="primary"
          onClick={() => handleSubmit()}
          disabled={!value.trim() || isLoading}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
