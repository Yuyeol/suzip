"use client";

import { useState } from "react";
import SearchBar from "@/app/(home)/_components/search-bar";
import ViewTabs from "@/app/(home)/_components/view-tabs";
import SortSelector from "@/app/(home)/_components/sort-selector";
import FoldersTab from "@/app/(home)/_components/folders-tab";
import BookmarksTab from "@/app/(home)/_components/bookmarks-tab";

export default function Home() {
  const [activeView, setActiveView] = useState<"all" | "folders">("all");

  return (
    <div className="min-h-screen bg-background pb-20">
      <SearchBar />
      <ViewTabs onViewChange={setActiveView} currentView={activeView} />
      <SortSelector />

      {/* 콘텐츠 영역 */}
      <div className="px-4 py-4">
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
