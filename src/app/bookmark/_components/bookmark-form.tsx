"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FormInput from "@/shared/components/core/form-input";
import FormTextarea from "@/shared/components/core/form-textarea";
import FolderSelector from "@/app/bookmark/_components/folder-selector";
import CreateFolderButton from "@/app/bookmark/_components/create-folder-button";
import FolderForm from "@/shared/components/folder/folder-form";
import UrlInput from "@/app/bookmark/_components/url-input";
import Button from "@/shared/components/core/button";

export interface BookmarkFormData {
  url: string;
  title: string;
  description: string;
  memo: string;
  folderId?: string;
}

interface BookmarkFormProps {
  mode: "create" | "edit";
  initialData?: {
    url: string;
    title: string;
    description?: string | null;
    memo?: string | null;
    folder_id?: string | null;
    thumbnail?: string | null;
  };
  onSubmit: (data: BookmarkFormData & { thumbnail: string | null }) => void;
  isPending: boolean;
}

export default function BookmarkForm({
  mode,
  initialData,
  onSubmit,
  isPending,
}: BookmarkFormProps) {
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);

  const { control, handleSubmit, setValue, reset } = useForm<BookmarkFormData>({
    defaultValues: {
      url: "",
      title: "",
      description: "",
      memo: "",
      folderId: undefined,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        url: initialData.url,
        title: initialData.title,
        description: initialData.description || "",
        memo: initialData.memo || "",
        folderId: initialData.folder_id || undefined,
      });
      setThumbnail(initialData.thumbnail || null);
    }
  }, [initialData, reset]);

  const handleCancel = () => {
    router.back();
  };

  const handleFolderCreated = (folderId?: string) => {
    if (folderId) {
      setValue("folderId", folderId);
    }
    setIsFolderFormOpen(false);
  };

  const onFormSubmit = (data: BookmarkFormData) => {
    onSubmit({ ...data, thumbnail });
  };

  const title = mode === "create" ? "링크 추가" : "링크 수정";
  const submitLabel =
    mode === "create"
      ? isPending
        ? "저장 중..."
        : "저장"
      : isPending
      ? "수정 중..."
      : "수정";

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-foreground mb-6">{title}</h1>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <UrlInput
          control={control}
          urlFieldName="url"
          onMetadataFetched={(data) => {
            if (data.title) setValue("title", data.title);
            if (data.description) setValue("description", data.description);
            setThumbnail(data.thumbnail || null);
          }}
        />

        {thumbnail && (
          <div className="relative rounded-lg overflow-hidden border border-border-light h-48">
            <Image
              src={thumbnail}
              alt="Thumbnail preview"
              fill
              className="object-cover"
            />
          </div>
        )}

        <FormInput
          name="title"
          control={control}
          label="제목"
          placeholder="제목을 입력하세요"
          maxLength={100}
          rules={{ required: "제목을 입력해주세요" }}
        />

        <FormTextarea
          name="description"
          control={control}
          label="설명"
          placeholder="설명을 입력하세요"
          maxLength={500}
          rows={3}
        />

        <FormTextarea
          name="memo"
          control={control}
          label="메모"
          placeholder="메모를 입력하세요"
          maxLength={500}
          rows={3}
        />

        <div>
          <FolderSelector name="folderId" control={control} />

          {isFolderFormOpen && (
            <FolderForm
              mode="create"
              placeholder="폴더 이름을 입력하세요"
              onSuccess={handleFolderCreated}
            />
          )}
          <CreateFolderButton
            isOpen={isFolderFormOpen}
            onToggle={() => setIsFolderFormOpen(!isFolderFormOpen)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="neutral" onClick={handleCancel}>
            취소
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
