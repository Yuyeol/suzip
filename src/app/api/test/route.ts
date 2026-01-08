import { NextResponse } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";
import { getUserId } from "@/app/api/_utils/get-user-id";

export async function GET() {
  try {
    const supabase = await createClient();
    const userId = getUserId();

    // folders 테이블 연결 테스트
    const { data: folders, error: foldersError } = await supabase
      .from("folders")
      .select("id, name")
      .eq("user_id", userId)
      .limit(5);

    if (foldersError) {
      return NextResponse.json(
        { error: "Folders query failed", details: foldersError.message },
        { status: 500 }
      );
    }

    // bookmarks 테이블 연결 테스트
    const { data: bookmarks, error: bookmarksError } = await supabase
      .from("bookmarks")
      .select("id, title")
      .eq("user_id", userId)
      .limit(5);

    if (bookmarksError) {
      return NextResponse.json(
        { error: "Bookmarks query failed", details: bookmarksError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "ok",
      message: "Supabase connection successful",
      userId,
      data: {
        folders: folders || [],
        bookmarks: bookmarks || [],
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Connection test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
