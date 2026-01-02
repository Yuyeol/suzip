export const folderKeys = {
  all: ["folders"] as const,
  list: () => [...folderKeys.all, "list"] as const,
} as const;

export const bookmarkKeys = {
  all: ["bookmarks"] as const,
  list: (params?: {
    search?: string;
    sort?: string;
    order?: "asc" | "desc";
    folder_id?: string;
    is_favorite?: boolean;
  }) => [...bookmarkKeys.all, "list", params] as const,
  detail: (id: string) => [...bookmarkKeys.all, "detail", id] as const,
} as const;
