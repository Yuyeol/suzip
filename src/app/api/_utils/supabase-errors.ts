import { PostgrestError } from "@supabase/supabase-js";
import { errorResponse } from "./response";

/**
 * Supabase 에러를 Next.js 응답으로 변환
 */
export function handleSupabaseError(error: PostgrestError, resourceName: string = "Resource") {
  // 404: 리소스를 찾을 수 없음
  if (error.code === "PGRST116") {
    return errorResponse(`${resourceName} not found`, 404, error.message);
  }

  // 23505: Unique constraint violation
  if (error.code === "23505") {
    return errorResponse(`${resourceName} already exists`, 409, error.message);
  }

  // 23503: Foreign key constraint violation
  if (error.code === "23503") {
    return errorResponse("Related resource not found", 400, error.message);
  }

  // 23502: Not null violation
  if (error.code === "23502") {
    return errorResponse("Missing required field", 400, error.message);
  }

  // 42501: Insufficient privilege (RLS)
  if (error.code === "42501") {
    return errorResponse("Permission denied", 403, error.message);
  }

  // 기본 서버 에러
  return errorResponse(
    `Failed to process ${resourceName.toLowerCase()}`,
    500,
    error.message
  );
}
