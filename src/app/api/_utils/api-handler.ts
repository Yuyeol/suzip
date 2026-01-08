import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "./response";

type AsyncHandler<T = unknown> = (
  request: NextRequest,
  context?: T
) => Promise<NextResponse>;

/**
 * API 핸들러를 try-catch로 감싸는 고차 함수
 *
 * @example
 * export const GET = withErrorHandler(async (request) => {
 *   const data = await fetchData();
 *   return successResponse(data);
 * });
 */
export function withErrorHandler<T = unknown>(
  handler: AsyncHandler<T>
): AsyncHandler<T> {
  return async (request: NextRequest, context?: T) => {
    try {
      return await handler(request, context);
    } catch (error) {
      console.error("API Error:", error);

      return errorResponse(
        "Internal server error",
        500,
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  };
}
