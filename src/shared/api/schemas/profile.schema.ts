import { z } from "zod";

// Profile Stats
export const profileStatsSchema = z.object({
  total_bookmarks: z.number(),
  folder_count: z.number(),
  favorite_count: z.number(),
});

export const profileStatsGetResponseSchema = z.object({
  data: profileStatsSchema,
});

export type ProfileStats = z.infer<typeof profileStatsSchema>;
export type ProfileStatsGetResponse = z.infer<
  typeof profileStatsGetResponseSchema
>;
