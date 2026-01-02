"use client";

import { useState } from "react";
import FolderCard from "@/app/_components/folder-card";
import LinkCard from "@/app/_components/link-card";
import SearchBar from "@/app/_components/search-bar";
import ViewTabs from "@/app/_components/view-tabs";
import SortSelector from "@/app/_components/sort-selector";
import { useGetFolders } from "@/shared/hooks/queries/folders/useGetFolders";

// TODO: 실제 데이터는 API에서 가져오기
const MOCK_LINKS = [
  {
    id: "1",
    title: "Next.js 공식 문서",
    url: "https://nextjs.org/docs",
    description: "The React Framework for the Web",
    createdAt: "2024.12.08",
    platform: "nextjs.org",
    thumbnail: "",
    isFavorite: true,
  },
  {
    id: "2",
    title: "Tailwind CSS 가이드",
    url: "https://tailwindcss.com",
    description: "A utility-first CSS framework",
    createdAt: "2024.12.07",
    platform: "tailwindcss.com",
    thumbnail: "",
    isFavorite: false,
  },
  {
    id: "3",
    title: "TypeScript Handbook",
    url: "https://www.typescriptlang.org/docs",
    description: "TypeScript is JavaScript with syntax for types",
    createdAt: "2024.12.06",
    platform: "typescriptlang.org",
    thumbnail: "",
    isFavorite: false,
  },
];

export default function Home() {
  const [activeView, setActiveView] = useState<"all" | "folders">("all");
  const { data: folders = [], isLoading: isFoldersLoading } = useGetFolders();

  return (
    <div className="min-h-screen bg-background pb-20">
      <SearchBar />
      <ViewTabs onViewChange={setActiveView} currentView={activeView} />
      <SortSelector />

      {/* 콘텐츠 영역 */}
      <div className="px-4 py-4">
        {activeView === "all" ? (
          // 전체보기: 링크 카드 1-column
          <div className="space-y-3">
            {MOCK_LINKS.map((link) => (
              <LinkCard key={link.id} {...link} />
            ))}
          </div>
        ) : (
          // 폴더보기: 폴더 카드 2-column
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
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
