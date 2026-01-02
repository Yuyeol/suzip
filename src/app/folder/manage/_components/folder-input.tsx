"use client";

import { useState } from "react";
import Input from "@/shared/components/core/input";
import Button from "@/shared/components/core/button";
import { usePostFolder } from "@/shared/hooks/queries/folders/usePostFolder";

export default function FolderInput() {
  const [value, setValue] = useState("");
  const postFolder = usePostFolder();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      postFolder.mutate(
        { name: value },
        {
          onSuccess: () => {
            setValue("");
          },
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1">
        <Input
          name="folderName"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="폴더명 입력..."
          maxLength={50}
        />
      </div>
      <Button type="submit" variant="primary" disabled={!value.trim()}>
        추가
      </Button>
    </form>
  );
}
