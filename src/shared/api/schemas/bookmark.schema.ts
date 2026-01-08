import { z } from "zod";

// Entity Schema
export const bookmarkSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  description: z.string().nullable(),
  folder_id: z.string().nullable(),
  is_favorite: z.boolean(),
  thumbnail: z.string().nullable(),
  memo: z.string().nullable(),
  user_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

// Request Schemas
export const bookmarkPostRequestSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  description: z.string().optional(),
  folder_id: z.string().optional(),
  is_favorite: z.boolean().optional(),
  thumbnail: z.string().optional(),
  memo: z.string().optional(),
});

export const bookmarkPatchRequestSchema = z.object({
  title: z.string().min(1).optional(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  folder_id: z.string().nullable().optional(),
  is_favorite: z.boolean().optional(),
  memo: z.string().optional(),
});

// Response Schemas
export const bookmarksGetResponse = z.object({
  data: z.array(bookmarkSchema),
});

export const bookmarkGetResponse = z.object({
  data: bookmarkSchema,
});

export const bookmarkPostResponse = z.object({
  data: bookmarkSchema,
});

export const bookmarkPatchResponse = z.object({
  data: bookmarkSchema,
});

// Types
export type Bookmark = z.infer<typeof bookmarkSchema>;
export type BookmarkPostRequest = z.infer<typeof bookmarkPostRequestSchema>;
export type BookmarkPatchRequest = z.infer<typeof bookmarkPatchRequestSchema>;
