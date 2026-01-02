import { NextRequest } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";
import { getUserId } from "@/app/api/_utils/get-user-id";
import { successResponse } from "@/app/api/_utils/response";
import { handleSupabaseError } from "@/app/api/_utils/supabase-errors";
import { withErrorHandler } from "@/app/api/_utils/api-handler";
import { validateRequired } from "@/app/api/_utils/validation";

export const GET = withErrorHandler(async () => {
  const supabase = await createClient();
  const userId = getUserId();

  // 폴더 조회
  const { data: folders, error } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

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
  const userId = getUserId();
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
