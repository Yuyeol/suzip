"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import Input from "@/shared/components/core/input";
import DropdownSelect from "@/shared/components/dropdown/dropdown-select";
import Button from "@/shared/components/core/button";
import { useQueryParam } from "@/shared/hooks/useQueryParam";
import { useSetQueryParams } from "@/shared/hooks/useSetQueryParams";

type SearchMode = "all" | "title" | "title_description";

const SEARCH_MODE_PLACEHOLDERS: Record<SearchMode, string> = {
  all: "북마크 검색...",
  title: "제목 검색...",
  title_description: "제목 또는 설명 검색...",
};

export default function SearchBar() {
  const searchParam = useQueryParam("search", "");
  const modeParam = useQueryParam("mode", "all" as SearchMode);

  const [searchValue, setSearchValue] = useState(searchParam);
  const [searchMode, setSearchMode] = useState<SearchMode>(
    modeParam as SearchMode
  );

  const setParams = useSetQueryParams(["search", "mode"]);

  const searchModeOptions = [
    { value: "all" as SearchMode, label: "전체" },
    { value: "title" as SearchMode, label: "제목만" },
    { value: "title_description" as SearchMode, label: "제목+설명" },
  ];

  const handleSearch = () => {
    setParams({
      search: searchValue.trim() || null,
      mode: searchMode,
    });
  };

  const handleClear = () => {
    setSearchValue("");
    setSearchMode("all");
    setParams({ search: null, mode: null });
  };

  const handleModeChange = (mode: SearchMode) => {
    setSearchMode(mode);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full px-4 py-3">
      <div className="space-y-2">
        {/* Search Bar */}
        <div className="relative flex items-center gap-2">
          {/* Mode Selector */}
          <DropdownSelect
            options={searchModeOptions}
            value={searchMode}
            onChange={handleModeChange}
          />

          {/* Search Input */}
          <div className="flex-1 relative">
            <Search
              size={18}
              className="text-muted absolute left-3 top-1/2 -translate-y-1/2"
            />
            <Input
              name="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={SEARCH_MODE_PLACEHOLDERS[searchMode]}
              className="px-9"
            />
            {searchValue && (
              <button
                onClick={handleClear}
                className="text-muted absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Search Button */}
          <Button onClick={handleSearch} variant="primary">
            검색
          </Button>
        </div>
      </div>
    </div>
  );
}
