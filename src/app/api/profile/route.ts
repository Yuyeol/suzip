import { createClient } from "@/shared/lib/supabase/server";
import { getUserId } from "@/app/api/_utils/get-user-id";
import { successResponse, errorResponse } from "@/app/api/_utils/response";
import { handleSupabaseError } from "@/app/api/_utils/supabase-errors";
import { withErrorHandler } from "@/app/api/_utils/api-handler";

export const dynamic = "force-dynamic";

export const GET = withErrorHandler(async () => {
  const supabase = await createClient();
  const userId = await getUserId();

  // 사용자 이메일 가져오기
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Google OAuth 사용 시 이메일은 항상 존재하지만, TypeScript 타입 안전성을 위해 체크
  if (!user?.email) {
    return errorResponse("User email not found", 500);
  }

  // 총 북마크 수
  const { count: totalBookmarks, error: bookmarksError } = await supabase
    .from("bookmarks")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (bookmarksError) {
    return handleSupabaseError(bookmarksError, "Bookmarks");
  }

  // 폴더 수
  const { count: folderCount, error: foldersError } = await supabase
    .from("folders")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (foldersError) {
    return handleSupabaseError(foldersError, "Folders");
  }

  // 즐겨찾기 수
  const { count: favoriteCount, error: favoritesError } = await supabase
    .from("bookmarks")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_favorite", true);

  if (favoritesError) {
    return handleSupabaseError(favoritesError, "Favorites");
  }

  return successResponse({
    email: user.email,
    total_bookmarks: totalBookmarks || 0,
    folder_count: folderCount || 0,
    favorite_count: favoriteCount || 0,
  });
});
