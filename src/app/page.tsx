'use client';

import { useState } from 'react';
import Header from '@/shared/components/layout/header';
import BottomNav from '@/shared/components/layout/bottom-nav';
import FolderCard from '@/app/_components/folder-card';
import LinkCard from '@/app/_components/link-card';
import SearchBar from '@/app/_components/search-bar';
import ViewTabs from '@/app/_components/view-tabs';
import SortSelector from '@/app/_components/sort-selector';

// TODO: 실제 데이터는 API에서 가져오기
const MOCK_LINKS = [
  {
    id: '1',
    title: 'Next.js 공식 문서',
    url: 'https://nextjs.org/docs',
    description: 'The React Framework for the Web',
    createdAt: '2024.12.08',
    platform: 'nextjs.org',
    thumbnail: '',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Tailwind CSS 가이드',
    url: 'https://tailwindcss.com',
    description: 'A utility-first CSS framework',
    createdAt: '2024.12.07',
    platform: 'tailwindcss.com',
    thumbnail: '',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'TypeScript Handbook',
    url: 'https://www.typescriptlang.org/docs',
    description: 'TypeScript is JavaScript with syntax for types',
    createdAt: '2024.12.06',
    platform: 'typescriptlang.org',
    thumbnail: '',
    isFavorite: false,
  },
];

const MOCK_FOLDERS = [
  { id: '1', name: '개발 자료', itemCount: 12 },
  { id: '2', name: '디자인 레퍼런스', itemCount: 5 },
  { id: '3', name: '읽을거리', itemCount: 8 },
  { id: '4', name: '튜토리얼', itemCount: 15 },
];

export default function Home() {
  const [activeView, setActiveView] = useState<'all' | 'folders'>('all');

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      {/* 헤더 높이만큼 패딩 */}
      <div className="pt-14">
        <SearchBar />
        <ViewTabs onViewChange={setActiveView} currentView={activeView} />
        <SortSelector />

        {/* 콘텐츠 영역 */}
        <div className="px-4 py-4">
          {activeView === 'all' ? (
            // 전체보기: 링크 카드 1-column
            <div className="space-y-3">
              {MOCK_LINKS.map((link) => (
                <LinkCard key={link.id} {...link} />
              ))}
            </div>
          ) : (
            // 폴더보기: 폴더 카드 2-column
            <div className="grid grid-cols-2 gap-3">
              {MOCK_FOLDERS.map((folder) => (
                <FolderCard key={folder.id} {...folder} />
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
