// 공통 에러 타입
type TBaseAppError = Error & {
  errorType: 'api' | 'schema';
  isRetryable: boolean;
};

// API 에러 (HTTP 상태 코드 관련)
export type TApiError = TBaseAppError & {
  errorType: 'api';
  status: number;
  code?: string;
};

// 스키마 에러 (Zod 스키마 불일치)
export type TSchemaError = TBaseAppError & {
  errorType: 'schema';
};

// 재시도 가능한 HTTP 상태 코드
const RETRYABLE_STATUS_CODES = [408, 429, 500, 502, 503, 504];

export async function createApiError(response: Response): Promise<TApiError> {
  const errorData = await response.json().catch(() => ({}));
  const message = errorData.error || errorData.message || response.statusText;
  const error = new Error(`Request failed: ${response.status} ${message}`) as TApiError;

  error.errorType = 'api';
  error.status = response.status;
  error.code = errorData.code;
  error.isRetryable = RETRYABLE_STATUS_CODES.includes(response.status);

  return error;
}

export function createSchemaError(message?: string): TSchemaError {
  const error = new Error(
    message || 'Schema validation failed: Response data does not match expected schema',
  ) as TSchemaError;

  error.errorType = 'schema';
  error.isRetryable = false; // 스키마 에러는 재시도 불필요

  return error;
}

export function isApiError(error: unknown): error is TApiError {
  return error instanceof Error && 'errorType' in error && (error as TApiError).errorType === 'api';
}

export function isSchemaError(error: unknown): error is TSchemaError {
  return error instanceof Error && 'errorType' in error && (error as TSchemaError).errorType === 'schema';
}
