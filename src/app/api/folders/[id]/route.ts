import { NextRequest } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";
import { getUserId } from "@/app/api/_utils/get-user-id";
import { successResponse, messageResponse } from "@/app/api/_utils/response";
import { handleSupabaseError } from "@/app/api/_utils/supabase-errors";
import { withErrorHandler } from "@/app/api/_utils/api-handler";
import { validateRequired } from "@/app/api/_utils/validation";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export const PATCH = withErrorHandler(
  async (request: NextRequest, context?: RouteContext) => {
    const supabase = await createClient();
    const userId = await getUserId();
    const { id } = await context!.params;
    const body = await request.json();

    const { name } = body;

    // 필수 필드 검증
    const validation = validateRequired(body, ["name"]);
    if (validation) return validation;

    const { data, error } = await supabase
      .from("folders")
      .update({ name })
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      return handleSupabaseError(error, "Folder");
    }

    return successResponse(data);
  }
);

export const DELETE = withErrorHandler(
  async (_request: NextRequest, context?: RouteContext) => {
    const supabase = await createClient();
    const userId = await getUserId();
    const { id } = await context!.params;

    const { error } = await supabase
      .from("folders")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      return handleSupabaseError(error, "Folder");
    }

    return messageResponse("Folder deleted successfully");
  }
);
