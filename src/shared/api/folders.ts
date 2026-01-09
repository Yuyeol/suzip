import {
  folderPostRequestSchema,
  folderPatchRequestSchema,
  foldersGetResponse,
  folderPostResponse,
  folderPatchResponse,
  type Folder,
  type FolderPostRequest,
  type FolderPatchRequest,
} from "@/shared/api/schemas/folder.schema";
import { fetcher } from "@/shared/utils/api/fetcher";
import { buildUrlWithParams } from "@/shared/utils/buildUrlWithParams";

// GET /api/folders (목록 조회, 검색/필터 지원)
export async function getFolders(params: {
  search: string | null;
  sort: string | null;
  order: "asc" | "desc" | null;
  is_favorite: boolean | null;
}): Promise<Folder[]> {
  const url = buildUrlWithParams("/api/folders", params);
  const response = await fetcher(url, foldersGetResponse);
  return response.data;
}

// POST /api/folders
export async function postFolder(request: FolderPostRequest): Promise<Folder> {
  const validated = folderPostRequestSchema.parse(request);

  const url = "/api/folders";
  const response = await fetcher(url, folderPostResponse, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated),
  });

  return response.data;
}

// PATCH /api/folders/[id]
export async function patchFolder(
  id: string,
  request: FolderPatchRequest
): Promise<Folder> {
  const validated = folderPatchRequestSchema.parse(request);

  const url = `/api/folders/${id}`;
  const response = await fetcher(url, folderPatchResponse, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated),
  });

  return response.data;
}

// DELETE /api/folders/[id]
export async function deleteFolder(id: string): Promise<void> {
  const url = `/api/folders/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to delete folder");
  }
}

// POST /api/folders/[id]/favorite (즐겨찾기 토글)
export async function postFolderFavorite(id: string): Promise<Folder> {
  const url = `/api/folders/${id}/favorite`;
  const response = await fetcher(url, folderPostResponse, {
    method: "POST",
  });

  return response.data;
}

// Re-export types
export type { Folder, FolderPostRequest, FolderPatchRequest };
