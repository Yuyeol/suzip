"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import FormInput from "@/shared/components/core/form-input";
import FormTextarea from "@/shared/components/core/form-textarea";
import FolderSelector from "@/app/bookmark/_components/folder-selector";
import CreateFolderButton from "@/app/bookmark/_components/create-folder-button";
import FolderForm from "@/shared/components/folder/folder-form";
import UrlInput from "@/app/bookmark/_components/url-input";
import Button from "@/shared/components/core/button";
import { useGetBookmark } from "@/shared/hooks/queries/bookmarks/useGetBookmark";
import { usePatchBookmark } from "@/shared/hooks/queries/bookmarks/usePatchBookmark";
import dynamic from "next/dynamic";

interface BookmarkFormData {
  url: string;
  title: string;
  description: string;
  memo: string;
  folderId?: string;
}

function BookmarkEditPage() {
  const router = useRouter();
  const params = useParams();
  const bookmarkId = params.id as string;

  const { data: bookmark, isLoading } = useGetBookmark({ id: bookmarkId });
  const patchBookmark = usePatchBookmark();
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);

  const { control, handleSubmit, reset, setValue } = useForm<BookmarkFormData>({
    defaultValues: {
      url: "",
      title: "",
      description: "",
      memo: "",
      folderId: undefined,
    },
  });

  useEffect(() => {
    if (bookmark) {
      reset({
        url: bookmark.url,
        title: bookmark.title,
        description: bookmark.description || "",
        memo: bookmark.memo || "",
        folderId: bookmark.folder_id || undefined,
      });
      setThumbnail(bookmark.thumbnail);
    }
  }, [bookmark, reset]);

  const handleCancel = () => {
    router.push("/");
  };

  const handleFolderCreated = (folderId?: string) => {
    if (folderId) {
      setValue("folderId", folderId);
    }
    setIsFolderFormOpen(false);
  };

  const onSubmit = async (data: BookmarkFormData) => {
    patchBookmark.mutate(
      {
        id: bookmarkId,
        request: {
          url: data.url,
          title: data.title,
          description: data.description,
          folder_id: data.folderId || null,
          memo: data.memo || undefined,
        },
      },
      {
        onSuccess: () => {
          router.push(`/bookmark/${bookmarkId}`);
        },
        onError: (error) => {
          console.error("Failed to update bookmark:", error);
          alert("북마크 수정에 실패했습니다.");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-muted">로딩 중...</p>
      </div>
    );
  }

  if (!bookmark) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-muted">북마크를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">링크 수정</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <UrlInput
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
            <Button
              type="submit"
              variant="primary"
              disabled={patchBookmark.isPending}
            >
              {patchBookmark.isPending ? "수정 중..." : "수정"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(BookmarkEditPage), {
  ssr: false,
});
