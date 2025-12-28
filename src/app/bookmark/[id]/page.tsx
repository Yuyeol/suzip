"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ExternalLink, MoreVertical } from "lucide-react";
import Text from "@/shared/components/core/text";
import Dropdown, { DropdownOption } from "@/shared/components/core/dropdown";

export default function BookmarkDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // TODO: API에서 북마크 데이터 가져오기
  const bookmark = {
    id: "1",
    title: "북마크 제목 예시",
    url: "https://example.com",
    description: "북마크 설명 텍스트입니다.",
    folder: "개발",
    createdAt: "2024.12.28",
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
      onClick: () => {
        // TODO: 삭제 확인 모달 + API 호출
        console.log("삭제:", id);
      },
    },
  ];

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
          {bookmark.createdAt}
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

        {/* 설명 */}
        {bookmark.description && (
          <div className="flex flex-col gap-2">
            <Text variant="body-3" className="text-muted">
              설명
            </Text>
            <Text variant="body-2">{bookmark.description}</Text>
          </div>
        )}

        {/* 폴더 */}
        <div className="flex flex-col gap-2">
          <Text variant="body-3" className="text-muted">
            폴더
          </Text>
          <Text variant="body-2">{bookmark.folder || "미분류"}</Text>
        </div>
      </div>
    </div>
  );
}
