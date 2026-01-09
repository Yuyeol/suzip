"use client";

import DropdownSelect from "@/shared/components/dropdown/dropdown-select";
import { useGetFolders } from "@/shared/hooks/queries/folders/useGetFolders";
import { useQueryParam } from "@/shared/hooks/useQueryParam";
import { useSetQueryParams } from "@/shared/hooks/useSetQueryParams";
import { parseAsBoolean } from "@/shared/utils/queryStateParsers";

type SortType = "latest" | "oldest" | "name";

export default function FilterControls() {
  const activeView = useQueryParam("view", "all");
  const { data: folders = [] } = useGetFolders({
    search: null,
    sort: null,
    order: null,
    is_favorite: null,
  });

  const currentSort = useQueryParam("sort", "latest") as SortType;
  const currentFolderId = useQueryParam("folder_id");
  const isFavoriteFilter = useQueryParam(
    "is_favorite",
    undefined,
    parseAsBoolean
  );
  const setParams = useSetQueryParams(["sort", "folder_id", "is_favorite"]);

  const sortOptions = [
    { value: "latest" as SortType, label: "최신순" },
    { value: "oldest" as SortType, label: "오래된순" },
    { value: "name" as SortType, label: "가나다순" },
  ];

  const folderOptions: { value: string | null; label: string }[] = [
    { value: null, label: "전체 폴더" },
    { value: "null", label: "폴더 없음" },
    ...folders.map((folder) => ({
      value: folder.id,
      label: folder.name,
    })),
  ];

  const handleSortChange = (sort: SortType) => {
    setParams({
      sort: sort === "latest" ? null : sort,
      folder_id: currentFolderId,
      is_favorite: isFavoriteFilter ? true : null,
    });
  };

  const handleFolderChange = (folderId: string | null) => {
    setParams({
      sort: currentSort === "latest" ? null : currentSort,
      folder_id: folderId,
      is_favorite: isFavoriteFilter ? true : null,
    });
  };

  const handleFavoriteToggle = () => {
    setParams({
      sort: currentSort === "latest" ? null : currentSort,
      folder_id: currentFolderId,
      is_favorite: isFavoriteFilter ? null : true,
    });
  };

  return (
    <div className="pb-4 flex items-center gap-2">
      <DropdownSelect
        options={sortOptions}
        value={currentSort}
        onChange={handleSortChange}
      />
      {activeView === "all" && (
        <DropdownSelect
          options={folderOptions}
          value={currentFolderId}
          onChange={handleFolderChange}
          placeholder="폴더 선택"
        />
      )}
      {(activeView === "all" || activeView === "folders") && (
        <button
          onClick={handleFavoriteToggle}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isFavoriteFilter
              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-300 dark:border-yellow-700"
              : "bg-background text-foreground border border-border-light"
          }`}
        >
          ⭐ 즐겨찾기
        </button>
      )}
    </div>
  );
}
