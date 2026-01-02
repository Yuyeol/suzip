import { z } from "zod";
import {
  folderSchema,
  folderPostRequestSchema,
  folderPatchRequestSchema,
  type Folder,
  type FolderPostRequest,
  type FolderPatchRequest,
} from "@/shared/api/schemas/folder.schema";
import { fetcher } from "@/shared/utils/api/fetcher";

// Response schemas (API가 { data: T } 형식으로 반환)
const foldersGetResponse = z.object({
  data: z.array(folderSchema),
});

const folderPostResponse = z.object({
  data: folderSchema,
});

const folderPatchResponse = z.object({
  data: folderSchema,
});

// GET /api/folders
export async function getFolders(): Promise<Folder[]> {
  const url = "/api/folders";
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

// Re-export types
export type { Folder, FolderPostRequest, FolderPatchRequest };
