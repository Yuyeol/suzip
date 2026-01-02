"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import Input from "@/shared/components/core/input";
import ModalSelector from "@/shared/components/core/modal-selector";
import Button from "@/shared/components/core/button";

type SearchMode = "all" | "title" | "title_description";

const SEARCH_MODE_PLACEHOLDERS: Record<SearchMode, string> = {
  all: "북마크 검색...",
  title: "제목 검색...",
  title_description: "제목 또는 설명 검색...",
};

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [searchMode, setSearchMode] = useState<SearchMode>(
    (searchParams.get("mode") as SearchMode) || "all"
  );

  const searchModeOptions = [
    { value: "all" as SearchMode, label: "전체" },
    { value: "title" as SearchMode, label: "제목만" },
    { value: "title_description" as SearchMode, label: "제목+설명" },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    } else {
      params.delete("search");
    }

    if (searchMode !== "all") {
      params.set("mode", searchMode);
    } else {
      params.delete("mode");
    }

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleClear = () => {
    setSearchValue("");
    setSearchMode("all");
    router.push("/", { scroll: false });
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
          <ModalSelector
            options={searchModeOptions}
            value={searchMode}
            onChange={handleModeChange}
            modalTitle="검색 범위"
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
