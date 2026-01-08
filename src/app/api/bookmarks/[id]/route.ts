import { NextRequest } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";
import { getUserId } from "@/app/api/_utils/get-user-id";
import { successResponse, messageResponse, errorResponse } from "@/app/api/_utils/response";
import { handleSupabaseError } from "@/app/api/_utils/supabase-errors";
import { withErrorHandler } from "@/app/api/_utils/api-handler";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export const GET = withErrorHandler(async (_request: NextRequest, context?: RouteContext) => {
  const supabase = await createClient();
  const userId = await getUserId();
  const { id } = await context!.params;

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) {
    return handleSupabaseError(error, "Bookmark");
  }

  return successResponse(data);
});

export const PATCH = withErrorHandler(async (request: NextRequest, context?: RouteContext) => {
  const supabase = await createClient();
  const userId = await getUserId();
  const { id } = await context!.params;
  const body = await request.json();

  const { title, url, description, folder_id, is_favorite, memo } = body;

  // 업데이트할 필드만 포함
  const updateData: Record<string, unknown> = {};
  if (title !== undefined) updateData.title = title;
  if (url !== undefined) updateData.url = url;
  if (description !== undefined) updateData.description = description;
  if (folder_id !== undefined) updateData.folder_id = folder_id;
  if (is_favorite !== undefined) updateData.is_favorite = is_favorite;
  if (memo !== undefined) updateData.memo = memo;

  // 업데이트할 내용이 없으면 에러
  if (Object.keys(updateData).length === 0) {
    return errorResponse("No fields to update", 400);
  }

  const { data, error } = await supabase
    .from("bookmarks")
    .update(updateData)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    return handleSupabaseError(error, "Bookmark");
  }

  return successResponse(data);
});

export const DELETE = withErrorHandler(async (_request: NextRequest, context?: RouteContext) => {
  const supabase = await createClient();
  const userId = await getUserId();
  const { id } = await context!.params;

  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    return handleSupabaseError(error, "Bookmark");
  }

  return messageResponse("Bookmark deleted successfully");
});
