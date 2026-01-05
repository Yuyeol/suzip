import {
  profileStatsGetResponseSchema,
  type ProfileStats,
} from "@/shared/api/schemas/profile.schema";
import { fetcher } from "@/shared/utils/api/fetcher";

// GET /api/profile/stats (통계 조회)
export async function getProfileStats(): Promise<ProfileStats> {
  const url = "/api/profile/stats";
  const response = await fetcher(url, profileStatsGetResponseSchema);
  return response.data;
}

// Re-export types
export type { ProfileStats };
