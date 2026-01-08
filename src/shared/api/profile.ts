import {
  profileGetResponseSchema,
  type Profile,
} from "@/shared/api/schemas/profile.schema";
import { fetcher } from "@/shared/utils/api/fetcher";

// GET /api/profile (프로필 조회)
export async function getProfile(): Promise<Profile> {
  const url = "/api/profile";
  const response = await fetcher(url, profileGetResponseSchema);
  return response.data;
}

// Re-export types
export type { Profile };
