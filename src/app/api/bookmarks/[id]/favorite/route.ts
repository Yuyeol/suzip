import { NextRequest } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";
import { getUserId } from "@/app/api/_utils/get-user-id";
import { successResponse } from "@/app/api/_utils/response";
import { handleSupabaseError } from "@/app/api/_utils/supabase-errors";
import { withErrorHandler } from "@/app/api/_utils/api-handler";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export const POST = withErrorHandler(async (_request: NextRequest, context?: RouteContext) => {
  const supabase = await createClient();
  const userId = await getUserId();
  const { id } = await context!.params;

  // 현재 북마크 조회
  const { data: bookmark, error: fetchError } = await supabase
    .from("bookmarks")
    .select("is_favorite")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (fetchError) {
    return handleSupabaseError(fetchError, "Bookmark");
  }

  // 즐겨찾기 토글
  const newFavoriteStatus = !bookmark.is_favorite;

  const { data, error: updateError } = await supabase
    .from("bookmarks")
    .update({ is_favorite: newFavoriteStatus })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (updateError) {
    return handleSupabaseError(updateError, "Bookmark");
  }

  return successResponse(data);
});
