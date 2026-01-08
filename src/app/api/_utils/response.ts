import { NextResponse } from "next/server";

/**
 * 성공 응답 생성
 */
export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json({ data }, { status });
}

/**
 * 에러 응답 생성
 */
export function errorResponse(
  message: string,
  status: number = 500,
  details?: string
) {
  const response: { error: string; details?: string } = { error: message };

  // 개발 환경에서만 details 포함
  if (details && process.env.NODE_ENV === "development") {
    response.details = details;
  }

  return NextResponse.json(response, { status });
}

/**
 * 메시지만 있는 응답 생성
 */
export function messageResponse(message: string, status: number = 200) {
  return NextResponse.json({ message }, { status });
}
