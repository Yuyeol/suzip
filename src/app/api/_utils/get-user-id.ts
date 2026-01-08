import { createClient } from "@/shared/lib/supabase/server";

/**
 * 현재 인증된 사용자 ID를 반환
 * @returns 사용자 ID
 * @throws 인증되지 않은 경우 에러
 */
export async function getUserId(): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized");
  }

  return user.id;
}
