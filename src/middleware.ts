import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // API 경로는 건너뛰기
  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인 페이지는 항상 접근 가능
  if (request.nextUrl.pathname === "/login") {
    // 이미 로그인한 경우 홈으로 리다이렉트
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return response;
  }

  // auth 콜백은 항상 접근 가능
  if (request.nextUrl.pathname.startsWith("/auth/callback")) {
    return response;
  }

  // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
