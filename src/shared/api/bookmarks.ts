import {
  bookmarkPostRequestSchema,
  bookmarkPatchRequestSchema,
  bookmarksGetResponse,
  bookmarkGetResponse,
  bookmarkPostResponse,
  bookmarkPatchResponse,
  type Bookmark,
  type BookmarkPostRequest,
  type BookmarkPatchRequest,
} from "@/shared/api/schemas/bookmark.schema";
import { fetcher } from "@/shared/utils/api/fetcher";

// GET /api/bookmarks (목록 조회, 검색/필터 지원)
export async function getBookmarks(params: {
  search: string | null;
  sort: string | null;
  order: "asc" | "desc" | null;
  folder_id: string | null;
  is_favorite: boolean | null;
}): Promise<Bookmark[]> {
  const searchParams = new URLSearchParams();

  if (params.search) searchParams.append("search", params.search);
  if (params.sort) searchParams.append("sort", params.sort);
  if (params.order) searchParams.append("order", params.order);
  if (params.folder_id) searchParams.append("folder_id", params.folder_id);
  if (params.is_favorite !== null)
    searchParams.append("is_favorite", String(params.is_favorite));

  const url = `/api/bookmarks${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;
  const response = await fetcher(url, bookmarksGetResponse);
  return response.data;
}

// GET /api/bookmarks/[id] (단일 조회)
export async function getBookmark(id: string): Promise<Bookmark> {
  const url = `/api/bookmarks/${id}`;
  const response = await fetcher(url, bookmarkGetResponse);
  return response.data;
}

// POST /api/bookmarks (생성)
export async function postBookmark(
  request: BookmarkPostRequest
): Promise<Bookmark> {
  const validated = bookmarkPostRequestSchema.parse(request);

  const url = "/api/bookmarks";
  const response = await fetcher(url, bookmarkPostResponse, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated),
  });

  return response.data;
}

// PATCH /api/bookmarks/[id] (수정)
export async function patchBookmark(
  id: string,
  request: BookmarkPatchRequest
): Promise<Bookmark> {
  const validated = bookmarkPatchRequestSchema.parse(request);

  const url = `/api/bookmarks/${id}`;
  const response = await fetcher(url, bookmarkPatchResponse, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated),
  });

  return response.data;
}

// DELETE /api/bookmarks/[id] (삭제)
export async function deleteBookmark(id: string): Promise<void> {
  const url = `/api/bookmarks/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to delete bookmark");
  }
}

// POST /api/bookmarks/[id]/favorite (즐겨찾기 토글)
export async function postFavorite(id: string): Promise<Bookmark> {
  const url = `/api/bookmarks/${id}/favorite`;
  const response = await fetcher(url, bookmarkPostResponse, {
    method: "POST",
  });

  return response.data;
}

// Re-export types
export type { Bookmark, BookmarkPostRequest, BookmarkPatchRequest };
