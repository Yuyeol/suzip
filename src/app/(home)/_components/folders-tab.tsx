"use client";

import FolderCard from "@/app/(home)/_components/folder-card";
import { useGetFolders } from "@/shared/hooks/queries/folders/useGetFolders";
import { useQueryParam } from "@/shared/hooks/useQueryParam";
import { parseAsBoolean } from "@/shared/utils/queryStateParsers";

export default function FoldersTab() {
  const search = useQueryParam("search");
  const sort = useQueryParam("sort");
  const isFavorite = useQueryParam("is_favorite", undefined, parseAsBoolean);

  // Sort 값에 따라 sort, order 파라미터 결정
  const getSortParams = () => {
    switch (sort) {
      case "latest":
        return { sort: "created_at", order: "desc" as const };
      case "oldest":
        return { sort: "created_at", order: "asc" as const };
      case "name":
        return { sort: "name", order: "asc" as const };
      default:
        return { sort: "created_at", order: "desc" as const };
    }
  };

  const sortParams = getSortParams();

  const { data: folders = [], isLoading: isFoldersLoading } = useGetFolders({
    search,
    ...sortParams,
    is_favorite: isFavorite,
  });

  return (
    <div className="grid grid-cols-2 gap-3">
      {isFoldersLoading ? (
        <p className="col-span-2 text-center text-muted">로딩 중...</p>
      ) : folders.length === 0 ? (
        <p className="col-span-2 text-center text-muted">폴더가 없습니다</p>
      ) : (
        folders.map((folder) => (
          <FolderCard
            key={folder.id}
            id={folder.id}
            name={folder.name}
            itemCount={folder.bookmark_count ?? 0}
            isFavorite={folder.is_favorite}
          />
        ))
      )}
    </div>
  );
}
