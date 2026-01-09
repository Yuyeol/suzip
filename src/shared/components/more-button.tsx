"use client";

import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import Dropdown, { DropdownOption } from "@/shared/components/core/dropdown";
import { useDeleteBookmark } from "@/shared/hooks/queries/bookmarks/useDeleteBookmark";
import { useDeleteFolder } from "@/shared/hooks/queries/folders/useDeleteFolder";
import { buildUrlWithParams } from "@/shared/utils/buildUrlWithParams";

interface Props {
  entityType: "bookmark" | "folder";
  entityId: string;
  itemCount?: number;
  onDeleteSuccess?: () => void;
}

export default function MoreButton({
  entityType,
  entityId,
  itemCount,
  onDeleteSuccess,
}: Props) {
  const router = useRouter();
  const deleteBookmark = useDeleteBookmark();
  const deleteFolder = useDeleteFolder();

  const handleDelete = () => {
    let confirmMessage = "정말 삭제하시겠습니까?";
    if (
      entityType === "folder" &&
      typeof itemCount === "number" &&
      itemCount > 0
    ) {
      confirmMessage = `${itemCount}개의 북마크가 저장되어 있습니다. 폴더를 삭제하시겠습니까?\n(북마크는 삭제되지 않고 '폴더 없음'으로 이동합니다.)`;
    }

    if (confirm(confirmMessage)) {
      const deleteMutation =
        entityType === "bookmark" ? deleteBookmark : deleteFolder;

      deleteMutation.mutate(entityId, {
        onSuccess: () => {
          onDeleteSuccess?.();
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }
  };

  const handleEdit = () => {
    if (entityType === "bookmark") {
      router.push(`/bookmark/${entityId}/edit`);
    } else {
      router.push(buildUrlWithParams("/folder/manage", { edit: entityId }));
    }
  };

  const dropdownOptions: DropdownOption[] = [
    {
      label: "수정",
      value: "edit",
      onClick: handleEdit,
    },
    {
      label: "삭제",
      value: "delete",
      variant: "danger",
      onClick: handleDelete,
    },
  ];

  return (
    <Dropdown
      trigger={
        <button className="flex items-center text-muted">
          <MoreVertical size={20} />
        </button>
      }
      options={dropdownOptions}
    />
  );
}
