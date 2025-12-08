'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type SortType = 'latest' | 'oldest' | 'name';

const SORT_LABELS: Record<SortType, string> = {
  latest: '최신순',
  oldest: '오래된순',
  name: '가나다순',
};

export default function SortSelector() {
  const [currentSort, setCurrentSort] = useState<SortType>('latest');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSortChange = (sort: SortType) => {
    setCurrentSort(sort);
    setIsModalOpen(false);
    // TODO: URL state 업데이트 + API 재호출
  };

  return (
    <>
      {/* 드롭다운 버튼 */}
      <div className="w-full px-4 py-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-between w-full px-4 py-2 border border-border-light rounded-lg bg-background"
        >
          <span className="text-sm text-foreground">{SORT_LABELS[currentSort]}</span>
          <ChevronDown size={16} className="text-muted" />
        </button>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-background rounded-lg p-6 w-80 max-w-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              {(Object.keys(SORT_LABELS) as SortType[]).map((sort) => (
                <button
                  key={sort}
                  onClick={() => handleSortChange(sort)}
                  className="flex items-center gap-3 w-full text-left py-2"
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      currentSort === sort
                        ? 'border-primary bg-primary'
                        : 'border-border-light'
                    }`}
                  >
                    {currentSort === sort && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </span>
                  <span className="text-sm text-foreground">{SORT_LABELS[sort]}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-6 py-2 bg-muted-light text-foreground rounded-lg"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
