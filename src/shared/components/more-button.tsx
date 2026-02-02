"use client";

import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import ActionMenu, { ActionMenuOption } from "@/shared/components/action-menu";
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

  const menuOptions: ActionMenuOption[] = [
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
      disabled: deleteBookmark.isPending,
    },
  ];

  return (
    <ActionMenu
      trigger={
        <button
          className="flex items-center text-muted disabled:opacity-50"
          disabled={deleteBookmark.isPending}
        >
          <MoreVertical size={20} />
        </button>
      }
      options={menuOptions}
    />
  );
}
