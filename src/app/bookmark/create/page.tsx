"use client";

import { useRouter } from "next/navigation";
import { usePostBookmark } from "@/shared/hooks/queries/bookmarks/usePostBookmark";
import BookmarkForm, {
  BookmarkFormData,
} from "@/app/bookmark/_components/bookmark-form";
import dynamic from "next/dynamic";

function BookmarkCreatePage() {
  const router = useRouter();
  const postBookmark = usePostBookmark();

  const onSubmit = async (
    data: BookmarkFormData & { thumbnail: string | null },
  ) => {
    postBookmark.mutate(
      {
        url: data.url,
        title: data.title,
        description: data.description,
        folder_id: data.folderId,
        is_favorite: false,
        thumbnail: data.thumbnail || undefined,
        memo: data.memo || undefined,
      },
      {
        onSuccess: () => {
          router.replace("/");
        },
        onError: (error) => {
          console.error("Failed to create bookmark:", error);
          alert("북마크 저장에 실패했습니다.");
        },
      },
    );
  };

  return (
    <div className="bg-background">
      <BookmarkForm
        mode="create"
        onSubmit={onSubmit}
        isPending={postBookmark.isPending}
      />
    </div>
  );
}

export default dynamic(() => Promise.resolve(BookmarkCreatePage), {
  ssr: false,
});
