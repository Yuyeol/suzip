"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FormInput from "@/shared/components/core/form-input";
import FormTextarea from "@/shared/components/core/form-textarea";
import FolderSelector from "@/app/bookmark/_components/folder-selector";
import CreateFolderButton from "@/app/bookmark/_components/create-folder-button";
import UrlInputWithFetch from "@/app/bookmark/_components/url-input-with-fetch";
import Button from "@/shared/components/core/button";
import { usePostBookmark } from "@/shared/hooks/queries/bookmarks/usePostBookmark";

interface BookmarkFormData {
  url: string;
  title: string;
  description: string;
  memo: string;
  folderId?: string;
}

export default function BookmarkCreatePage() {
  const router = useRouter();
  const postBookmark = usePostBookmark();
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const { control, handleSubmit, setValue } = useForm<BookmarkFormData>({
    defaultValues: {
      url: "",
      title: "",
      description: "",
      memo: "",
      folderId: undefined,
    },
  });

  const handleCancel = () => {
    router.push("/");
  };

  const onSubmit = async (data: BookmarkFormData) => {
    postBookmark.mutate(
      {
        url: data.url,
        title: data.title,
        description: data.description,
        folder_id: data.folderId,
        is_favorite: false,
        thumbnail: thumbnail || undefined,
        memo: data.memo || undefined,
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (error) => {
          console.error("Failed to create bookmark:", error);
          alert("북마크 저장에 실패했습니다.");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">링크 추가</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <UrlInputWithFetch
            control={control}
            urlFieldName="url"
            onMetadataFetched={(data) => {
              if (data.title) setValue("title", data.title);
              if (data.description) setValue("description", data.description);
              setThumbnail(data.thumbnail);
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

          <FolderSelector name="folderId" control={control} />

          <CreateFolderButton />

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="neutral" onClick={handleCancel}>
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={postBookmark.isPending}
            >
              {postBookmark.isPending ? "저장 중..." : "저장"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
