import { z } from "zod";

// Entity Schema
export const folderSchema = z.object({
  id: z.string(),
  name: z.string(),
  user_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  bookmark_count: z.number().optional(),
});

// Request Schemas
export const folderPostRequestSchema = z.object({
  name: z.string().min(1),
});

export const folderPatchRequestSchema = z.object({
  name: z.string().min(1),
});

// Response Schemas
export const foldersGetResponse = z.object({
  data: z.array(folderSchema),
});

export const folderPostResponse = z.object({
  data: folderSchema,
});

export const folderPatchResponse = z.object({
  data: folderSchema,
});

// Types
export type Folder = z.infer<typeof folderSchema>;
export type FolderPostRequest = z.infer<typeof folderPostRequestSchema>;
export type FolderPatchRequest = z.infer<typeof folderPatchRequestSchema>;
