"use client";

import { useRouter } from "next/navigation";
import Dropdown, { DropdownOption } from "@/shared/components/core/dropdown";
import { MoreVertical } from "lucide-react";
import { useDeleteFolder } from "@/shared/hooks/queries/folders/useDeleteFolder";
import { buildUrlWithParams } from "@/shared/utils/buildUrlWithParams";

interface Props {
  id: string;
  name: string;
  itemCount: number;
}

export default function FolderCard({ id, name, itemCount }: Props) {
  const router = useRouter();
  const deleteFolder = useDeleteFolder();

  const handleCardClick = () => {
    // 전체보기 탭으로 전환 + 해당 폴더 필터링
    router.push(buildUrlWithParams("/", { folder_id: id }));
  };

  const handleDelete = () => {
    if (confirm(`"${name}" 폴더를 삭제하시겠습니까?`)) {
      deleteFolder.mutate(id, {
        onSuccess: () => {
          // 성공 시 React Query가 자동으로 목록 갱신
        },
        onError: (error) => {
          alert("폴더 삭제에 실패했습니다.");
          console.error(error);
        },
      });
    }
  };

  const dropdownOptions: DropdownOption[] = [
    {
      label: "수정",
      value: "edit",
      onClick: () => router.push(buildUrlWithParams("/folder/manage", { edit: id })),
    },
    {
      label: "삭제",
      value: "delete",
      variant: "danger",
      onClick: handleDelete,
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
