export const folderKeys = {
  all: ["folders"] as const,
  list: (params: {
    search: string | null;
    sort: string | null;
    order: "asc" | "desc" | null;
  }) => [...folderKeys.all, "list", params] as const,
} as const;

export const bookmarkKeys = {
  all: ["bookmarks"] as const,
  list: (params: {
    search: string | null;
    sort: string | null;
    order: "asc" | "desc" | null;
    folder_id: string | null;
    is_favorite: boolean | null;
  }) => [...bookmarkKeys.all, "list", params] as const,
  detail: (id: string) => [...bookmarkKeys.all, "detail", id] as const,
} as const;

export const profileKeys = {
  all: ["profile"] as const,
  detail: () => [...profileKeys.all, "detail"] as const,
} as const;
