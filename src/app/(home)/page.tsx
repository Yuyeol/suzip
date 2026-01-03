"use client";

import SearchBar from "@/app/(home)/_components/search-bar";
import ViewTabs from "@/app/(home)/_components/view-tabs";
import FoldersTab from "@/app/(home)/_components/folders-tab";
import BookmarksTab from "@/app/(home)/_components/bookmarks-tab";
import ModalSelector from "@/shared/components/core/modal-selector";
import { useGetFolders } from "@/shared/hooks/queries/folders/useGetFolders";
import { useQueryParam } from "@/shared/hooks/useQueryParam";
import { useSetQueryParams } from "@/shared/hooks/useSetQueryParams";
import { parseAsBoolean } from "@/shared/utils/queryStateParsers";

type SortType = "latest" | "oldest" | "name";

export default function Home() {
  const { data: folders = [] } = useGetFolders({
    search: null,
    sort: null,
    order: null,
  });

  const activeView = useQueryParam("view", "all");
  const currentFolderId = useQueryParam("folder_id", "all");
  const currentSort = useQueryParam("sort", "latest") as SortType;
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

  const folderOptions = [
    { value: "all", label: "전체 폴더" },
    ...folders.map((folder) => ({
      value: folder.id,
      label: folder.name,
    })),
  ];

  const handleSortChange = (sort: SortType) => {
    setParams({
      sort: sort === "latest" ? null : sort,
      folder_id: currentFolderId === "all" ? null : currentFolderId,
      is_favorite: isFavoriteFilter ? true : null,
    });
  };

  const handleFolderChange = (folderId: string) => {
    setParams({
      sort: currentSort === "latest" ? null : currentSort,
      folder_id: folderId === "all" ? null : folderId,
      is_favorite: isFavoriteFilter ? true : null,
    });
  };

  const handleFavoriteToggle = () => {
    setParams({
      sort: currentSort === "latest" ? null : currentSort,
      folder_id: currentFolderId === "all" ? null : currentFolderId,
      is_favorite: isFavoriteFilter ? null : true,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <SearchBar />
      <ViewTabs />

      {/* 콘텐츠 영역 */}
      <div className="px-4 py-4">
        <div className="pb-4 flex items-center gap-2">
          <ModalSelector
            options={sortOptions}
            value={currentSort}
            onChange={handleSortChange}
            modalTitle="정렬"
          />
          {activeView === "all" && (
            <>
              <ModalSelector
                options={folderOptions}
                value={currentFolderId}
                onChange={handleFolderChange}
                modalTitle="폴더"
              />
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
            </>
          )}
        </div>
        {activeView === "all" ? (
          // 전체보기: 링크 카드 1-column
          <BookmarksTab />
        ) : (
          // 폴더보기: 폴더 카드 2-column
          <FoldersTab />
        )}
      </div>
    </div>
  );
}
