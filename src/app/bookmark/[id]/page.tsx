"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, MoreVertical } from "lucide-react";
import Text from "@/shared/components/core/text";
import Dropdown, { DropdownOption } from "@/shared/components/core/dropdown";
import { useGetBookmark } from "@/shared/hooks/queries/bookmarks/useGetBookmark";
import { useDeleteBookmark } from "@/shared/hooks/queries/bookmarks/useDeleteBookmark";
import { useGetFolders } from "@/shared/hooks/queries/folders/useGetFolders";

export default function BookmarkDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: bookmark, isLoading } = useGetBookmark({ id });
  const { data: folders = [] } = useGetFolders({
    search: null,
    sort: null,
    order: null,
  });
  const deleteBookmark = useDeleteBookmark();

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteBookmark.mutate(id, {
        onSuccess: () => {
          router.push("/");
        },
        onError: (error) => {
          console.error("Failed to delete bookmark:", error);
          alert("북마크 삭제에 실패했습니다.");
        },
      });
    }
  };

  const dropdownOptions: DropdownOption[] = [
    {
      label: "수정",
      value: "edit",
      onClick: () => router.push(`/bookmark/${id}/edit`),
    },
    {
      label: "삭제",
      value: "delete",
      variant: "danger",
      onClick: handleDelete,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">로딩 중...</p>
      </div>
    );
  }

  if (!bookmark) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">북마크를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const folder = folders.find((f) => f.id === bookmark.folder_id);
  const formattedDate = new Date(bookmark.created_at)
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\. /g, ".")
    .replace(/\.$/, "");

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* 뒤로가기 + 제목 + 더보기 */}
      <div className="p-4 border-b border-border-light">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <Text variant="title-2">{bookmark.title}</Text>
          </div>
          <Dropdown
            trigger={
              <button className="text-muted flex-shrink-0">
                <MoreVertical size={20} />
              </button>
            }
            options={dropdownOptions}
          />
        </div>
        <Text variant="body-3" className="text-muted">
          {formattedDate}
        </Text>
      </div>

      {/* 상세 정보 */}
      <div className="p-4 space-y-4">
        {/* URL */}
        <div className="flex flex-col gap-2">
          <Text variant="body-3" className="text-muted">
            URL
          </Text>
          <Link
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary"
          >
            <Text variant="body-2">{bookmark.url}</Text>
            <ExternalLink size={16} />
          </Link>
        </div>

        {/* 썸네일 */}
        {bookmark.thumbnail && (
          <div className="flex flex-col gap-2">
            <Text variant="body-3" className="text-muted">
              썸네일
            </Text>
            <div className="relative rounded-lg overflow-hidden border border-border-light h-48">
              <Image
                src={bookmark.thumbnail}
                alt={bookmark.title}
                className="object-cover"
                fill
              />
            </div>
          </div>
        )}

        {/* 설명 */}
        {bookmark.description && (
          <div className="flex flex-col gap-2">
            <Text variant="body-3" className="text-muted">
              설명
            </Text>
            <Text variant="body-2">{bookmark.description}</Text>
          </div>
        )}

        {/* 메모 */}
        {bookmark.memo && (
          <div className="flex flex-col gap-2">
            <Text variant="body-3" className="text-muted">
              메모
            </Text>
            <Text variant="body-2">{bookmark.memo}</Text>
          </div>
        )}

        {/* 폴더 */}
        <div className="flex flex-col gap-2">
          <Text variant="body-3" className="text-muted">
            폴더
          </Text>
          <Text variant="body-2">{folder?.name || "미분류"}</Text>
        </div>
      </div>
    </div>
  );
}
