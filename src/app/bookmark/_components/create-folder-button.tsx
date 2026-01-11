"use client";

import { Plus, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export default function CreateFolderButton({ isOpen, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center gap-1 text-sm text-primary mt-2 ml-auto"
    >
      {isOpen ? (
        <>
          닫기
          <X size={16} />
        </>
      ) : (
        <>
          새 폴더 만들기
          <Plus size={16} />
        </>
      )}
    </button>
  );
}
