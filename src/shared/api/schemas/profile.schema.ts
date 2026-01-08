import { z } from "zod";

// Profile (이메일 + 통계)
export const profileSchema = z.object({
  email: z.string().email(),
  total_bookmarks: z.number(),
  folder_count: z.number(),
  favorite_count: z.number(),
});

export const profileGetResponseSchema = z.object({
  data: profileSchema,
});

export type Profile = z.infer<typeof profileSchema>;
export type ProfileGetResponse = z.infer<typeof profileGetResponseSchema>;
