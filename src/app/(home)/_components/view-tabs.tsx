"use client";

import { useQueryParam } from "@/shared/hooks/useQueryParam";
import { useSetQueryParams } from "@/shared/hooks/useSetQueryParams";

type ViewType = "all" | "folders";

export default function ViewTabs() {
  const currentView = useQueryParam("view", "all" as ViewType);
  const setParams = useSetQueryParams([
    "view",
    "search",
    "folder_id",
    "is_favorite",
    "sort",
  ]);

  const handleViewChange = (view: ViewType) => {
    setParams({
      view,
      search: null,
      folder_id: null,
      is_favorite: null,
      sort: null,
    });
  };

  return (
    <div className="w-full px-4 py-3 border-b border-border-light">
      <div className="flex gap-6">
        <button
          onClick={() => handleViewChange("all")}
          className={`pb-2 px-1 text-sm font-medium transition-colors border-b-2 ${
            currentView === "all"
              ? "text-primary border-primary"
              : "text-muted border-transparent"
          }`}
        >
          전체보기
        </button>
        <button
          onClick={() => handleViewChange("folders")}
          className={`pb-2 px-1 text-sm font-medium transition-colors border-b-2 ${
            currentView === "folders"
              ? "text-primary border-primary"
              : "text-muted border-transparent"
          }`}
        >
          폴더보기
        </button>
      </div>
    </div>
  );
}
