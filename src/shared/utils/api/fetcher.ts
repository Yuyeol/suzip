import { z } from 'zod';
import { createApiError, createSchemaError } from './errors';

/**
 * Zod 스키마 검증과 에러 처리가 포함된 fetch 래퍼
 * @param url - 요청할 URL
 * @param schema - 응답 데이터를 검증할 Zod 스키마
 * @param options - fetch options (optional)
 * @returns 검증된 타입의 데이터
 * @throws ApiError (HTTP 에러) 또는 SchemaError (스키마 검증 에러)
 */
export async function fetcher<T>(url: string, schema: z.ZodSchema<T>, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw await createApiError(response);
    }

    const json = await response.json();
    const result = schema.safeParse(json);

    if (!result.success) {
      throw createSchemaError(`Schema validation failed: ${result.error.message}`);
    }

    return result.data;
  } catch (error) {
    throw error;
  }
}
