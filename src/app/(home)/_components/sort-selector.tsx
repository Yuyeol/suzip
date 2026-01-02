"use client";

import { useState } from "react";
import ModalSelector from "@/shared/components/core/modal-selector";

type SortType = "latest" | "oldest" | "name";

export default function SortSelector() {
  const [currentSort, setCurrentSort] = useState<SortType>("latest");

  const sortOptions = [
    { value: "latest" as SortType, label: "최신순" },
    { value: "oldest" as SortType, label: "오래된순" },
    { value: "name" as SortType, label: "가나다순" },
  ];

  const handleSortChange = (sort: SortType) => {
    setCurrentSort(sort);
    // TODO: URL state 업데이트 + API 재호출
  };

  return (
    <div className="w-full px-4 py-3">
      <ModalSelector
        options={sortOptions}
        value={currentSort}
        onChange={handleSortChange}
        modalTitle="정렬"
      />
    </div>
  );
}
