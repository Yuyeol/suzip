"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/app/(home)/_components/search-bar";
import ViewTabs from "@/app/(home)/_components/view-tabs";
import FoldersTab from "@/app/(home)/_components/folders-tab";
import BookmarksTab from "@/app/(home)/_components/bookmarks-tab";
import ModalSelector from "@/shared/components/core/modal-selector";
import { useGetFolders } from "@/shared/hooks/queries/folders/useGetFolders";

type SortType = "latest" | "oldest" | "name";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: folders = [] } = useGetFolders({
    search: null,
    sort: null,
    order: null,
  });

  const activeView = (searchParams.get("view") as "all" | "folders") || "all";
  const currentFolderId = searchParams.get("folder_id") || "all";
  const currentSort = (searchParams.get("sort") as SortType) || "latest";
  const isFavoriteFilter = searchParams.get("is_favorite") === "true";

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
    const params = new URLSearchParams(searchParams.toString());

    if (sort === "latest") {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleFolderChange = (folderId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (folderId === "all") {
      params.delete("folder_id");
    } else {
      params.set("folder_id", folderId);
    }

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleFavoriteToggle = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (isFavoriteFilter) {
      params.delete("is_favorite");
    } else {
      params.set("is_favorite", "true");
    }

    router.push(`/?${params.toString()}`, { scroll: false });
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
