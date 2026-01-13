import { NextRequest, NextResponse } from "next/server";

/**
 * 배열의 최신 updated_at을 기반으로 ETag 생성
 */
export function generateArrayETag<T extends { updated_at?: string }>(
  items: T[]
): string {
  const latestUpdate = items.reduce((latest, item) => {
    if (!item.updated_at) return latest;
    return item.updated_at > latest ? item.updated_at : latest;
  }, "");

  return latestUpdate || "empty";
}

/**
 * 성공 응답 생성 (ETag 지원)
 */
export function successResponse<T>(
  data: T,
  status: number = 200,
  options?: {
    headers?: HeadersInit;
    request?: NextRequest;
    etag?: string;
  }
) {
  // ETag 처리
  if (options?.request && options?.etag) {
    // 브라우저가 이전에 ETag 응답 헤더를 받았다면, 다음 요청 시 자동으로 if-none-match 요청 헤더를 추가하여 전송함
    const clientETag = options.request.headers.get("if-none-match");

    // if-none-match(요청 헤더)가 ETag(응답 헤더)와 일치하면 304(Not Modified) 응답
    if (clientETag === `"${options.etag}"` || clientETag === options.etag) {
      return new NextResponse(null, {
        status: 304,
        headers: { ETag: `"${options.etag}"` },
      });
    }

    // ETag (응답 헤더) 추가
    return NextResponse.json(
      { data },
      { status, headers: { ...options.headers, ETag: `"${options.etag}"` } }
    );
  }

  return NextResponse.json({ data }, { status, headers: options?.headers });
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
