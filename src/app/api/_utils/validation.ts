import { errorResponse } from "./response";

/**
 * 필수 필드 검증
 *
 * @example
 * const validation = validateRequired(body, ['title', 'url']);
 * if (validation) return validation; // 에러 응답 반환
 */
export function validateRequired(
  body: Record<string, unknown>,
  requiredFields: string[]
) {
  const missingFields = requiredFields.filter((field) => !body[field]);

  if (missingFields.length > 0) {
    return errorResponse(
      `Missing required fields: ${missingFields.join(", ")}`,
      400
    );
  }

  return null;
}

/**
 * URL 형식 검증
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * UUID 형식 검증
 */
export function isValidUuid(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}
