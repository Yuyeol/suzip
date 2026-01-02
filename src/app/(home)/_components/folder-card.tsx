"use client";

import { useRouter } from "next/navigation";
import Dropdown, { DropdownOption } from "@/shared/components/core/dropdown";
import { MoreVertical } from "lucide-react";

interface Props {
  id: string;
  name: string;
  itemCount: number;
}

export default function FolderCard({ id, name, itemCount }: Props) {
  const router = useRouter();

  const handleCardClick = () => {
    // TODO: 해당 폴더로 필터링 (전체보기 탭으로 전환 + folder ID 파라미터)
    router.push(`/?view=all&folder=${id}`);
  };

  const dropdownOptions: DropdownOption[] = [
    {
      label: "수정",
      value: "edit",
      onClick: () => router.push(`/folder/manage?edit=${id}`),
    },
    {
      label: "삭제",
      value: "delete",
      variant: "danger",
      onClick: () => {
        // TODO: 삭제 확인 모달 + API 호출
        console.log("폴더 삭제:", id);
      },
    },
  ];

  return (
    <div
      onClick={handleCardClick}
      className="p-4 border border-border-light rounded-lg bg-background cursor-pointer h-24 flex flex-col justify-between"
    >
      {/* 상단: 폴더명 & 더보기 */}
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-foreground line-clamp-1">
          {name}
        </h3>
        <Dropdown
          trigger={
            <button className="text-muted flex-shrink-0">
              <MoreVertical size={16} />
            </button>
          }
          options={dropdownOptions}
        />
      </div>

      {/* 하단: 개수 */}
      <div>
        <span className="text-xs text-muted">{itemCount}개</span>
      </div>
    </div>
  );
}
