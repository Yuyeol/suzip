"use client";

import { useRouter, useParams } from "next/navigation";
import { useGetBookmark } from "@/shared/hooks/queries/bookmarks/useGetBookmark";
import { usePatchBookmark } from "@/shared/hooks/queries/bookmarks/usePatchBookmark";
import BookmarkForm, {
  BookmarkFormData,
} from "@/app/bookmark/_components/bookmark-form";
import dynamic from "next/dynamic";
import { PulseLoader } from "react-spinners";

function BookmarkEditPage() {
  const router = useRouter();
  const params = useParams();
  const bookmarkId = params.id as string;

  const { data: bookmark, isLoading } = useGetBookmark({ id: bookmarkId });
  const patchBookmark = usePatchBookmark();

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
          router.replace(`/bookmark/${bookmarkId}`);
        },
        onError: (error) => {
          console.error("Failed to update bookmark:", error);
          alert("북마크 수정에 실패했습니다.");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <PulseLoader color="var(--color-primary)" size={10} />
      </div>
    );
  }

  if (!bookmark) {
    return (
      <div className="flex items-center justify-center p-20">
        <p className="text-muted">북마크를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <BookmarkForm
        mode="edit"
        initialData={bookmark}
        onSubmit={onSubmit}
        isPending={patchBookmark.isPending}
      />
    </div>
  );
}

export default dynamic(() => Promise.resolve(BookmarkEditPage), {
  ssr: false,
});
