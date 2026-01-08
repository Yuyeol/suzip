import { NextRequest } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";
import { getUserId } from "@/app/api/_utils/get-user-id";
import { successResponse } from "@/app/api/_utils/response";
import { handleSupabaseError } from "@/app/api/_utils/supabase-errors";
import { withErrorHandler } from "@/app/api/_utils/api-handler";
import { validateRequired } from "@/app/api/_utils/validation";

export const GET = withErrorHandler(async (request: NextRequest) => {
  const supabase = await createClient();
  const userId = await getUserId();
  const { searchParams } = request.nextUrl;

  // 쿼리 파라미터 추출
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "created_at";
  const order = searchParams.get("order") || "desc";
  const folderId = searchParams.get("folder_id");
  const isFavorite = searchParams.get("is_favorite");

  // 기본 쿼리 시작
  let query = supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", userId);

  // 검색 필터 (title, description, url)
  if (search) {
    query = query.or(
      `title.ilike.%${search}%,description.ilike.%${search}%,url.ilike.%${search}%`
    );
  }

  // 폴더 필터
  if (folderId) {
    query = query.eq("folder_id", folderId);
  }

  // 즐겨찾기 필터
  if (isFavorite === "true") {
    query = query.eq("is_favorite", true);
  }

  // 정렬
  const isAscending = order === "asc";
  query = query.order(sort, { ascending: isAscending });

  const { data, error } = await query;

  if (error) {
    return handleSupabaseError(error, "Bookmarks");
  }

  return successResponse(data);
});

export const POST = withErrorHandler(async (request: NextRequest) => {
  const supabase = await createClient();
  const userId = await getUserId();
  const body = await request.json();

  const { title, url, description, folder_id, is_favorite, thumbnail, memo } = body;

  // 필수 필드 검증
  const validation = validateRequired(body, ["title", "url"]);
  if (validation) return validation;

  // 북마크 생성
  const { data, error } = await supabase
    .from("bookmarks")
    .insert({
      title,
      url,
      description: description || null,
      folder_id: folder_id || null,
      is_favorite: is_favorite || false,
      thumbnail: thumbnail || null,
      memo: memo || null,
      user_id: userId,
    })
    .select()
    .single();

  if (error) {
    return handleSupabaseError(error, "Bookmark");
  }

  return successResponse(data, 201);
});
