"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import Input from "@/shared/components/core/input";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  const handleClear = () => {
    setSearchValue("");
    // TODO: 검색 초기화 API 호출 또는 상태 업데이트
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    // TODO: 500ms debounce 후 API 호출
  };

  return (
    <div className="w-full px-4 py-3">
      <div className="relative">
        <div className="flex items-center relative">
          <Search
            size={18}
            className="text-muted absolute left-3 top-1/2 -translate-y-1/2"
          />
          <div className="flex-1">
            <Input
              name="search"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="검색어 입력..."
              className="px-9"
            />
          </div>
          {searchValue && (
            <button
              onClick={handleClear}
              className="text-muted absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
