import { z } from "zod";

// 북마크 카운트 없는 폴더 스키마 (DB 테이블과 동일)
export const folderWithoutCountSchema = z.object({
  id: z.string(),
  name: z.string(),
  user_id: z.string(),
  is_favorite: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

// 기본 폴더 스키마 (북마크 카운트 포함 - 일반적으로 사용)
export const folderSchema = folderWithoutCountSchema.extend({
  bookmark_count: z.number(),
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
  data: folderWithoutCountSchema,
});

export const folderPatchResponse = z.object({
  data: folderWithoutCountSchema,
});

// Types
export type Folder = z.infer<typeof folderSchema>;
export type FolderWithoutCount = z.infer<typeof folderWithoutCountSchema>;
export type FolderPostRequest = z.infer<typeof folderPostRequestSchema>;
export type FolderPatchRequest = z.infer<typeof folderPatchRequestSchema>;
