"use client";

import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import Dropdown, { DropdownOption } from "@/shared/components/core/dropdown";
import { useDeleteBookmark } from "@/shared/hooks/queries/bookmarks/useDeleteBookmark";

interface Props {
  entityId: string;
  onDeleteSuccess?: () => void;
}

export default function MoreButton({ entityId, onDeleteSuccess }: Props) {
  const router = useRouter();
  const deleteBookmark = useDeleteBookmark();

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteBookmark.mutate(entityId, {
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
    router.push(`/bookmark/${entityId}/edit`);
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