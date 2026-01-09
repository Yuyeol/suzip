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
  const isFavorite = searchParams.get("is_favorite");

  // 기본 쿼리 시작
  let query = supabase
    .from("folders")
    .select("*")
    .eq("user_id", userId);

  // 검색 필터
  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  // 즐겨찾기 필터
  if (isFavorite === "true") {
    query = query.eq("is_favorite", true);
  }

  const { data: folders, error } = await query.order(sort, {
    ascending: order === "asc",
  });

  if (error) {
    return handleSupabaseError(error, "Folders");
  }

  // 각 폴더별 북마크 개수 조회
  const foldersWithCount = await Promise.all(
    (folders || []).map(async (folder) => {
      const { count } = await supabase
        .from("bookmarks")
        .select("*", { count: "exact", head: true })
        .eq("folder_id", folder.id);

      return {
        ...folder,
        bookmark_count: count || 0,
      };
    })
  );

  return successResponse(foldersWithCount);
});

export const POST = withErrorHandler(async (request: NextRequest) => {
  const supabase = await createClient();
  const userId = await getUserId();
  const body = await request.json();

  const { name } = body;

  // 필수 필드 검증
  const validation = validateRequired(body, ["name"]);
  if (validation) return validation;

  // 폴더 생성
  const { data, error } = await supabase
    .from("folders")
    .insert({
      name,
      user_id: userId,
    })
    .select()
    .single();

  if (error) {
    return handleSupabaseError(error, "Folder");
  }

  return successResponse(data, 201);
});
