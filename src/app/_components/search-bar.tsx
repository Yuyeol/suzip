'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');

  const handleClear = () => {
    setSearchValue('');
    // TODO: 검색 초기화 API 호출 또는 상태 업데이트
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    // TODO: 500ms debounce 후 API 호출
  };

  return (
    <div className="w-full px-4 py-3">
      <div className="relative">
        <div className="flex items-center gap-2 px-4 py-3 border border-border-light rounded-lg bg-background">
          <Search size={18} className="text-muted" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="검색어 입력..."
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted"
          />
          {searchValue && (
            <button
              onClick={handleClear}
              className="text-muted"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
