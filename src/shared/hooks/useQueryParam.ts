import { useSearchParams } from 'next/navigation';

/**
 * useQueryParam - URL 쿼리 파라미터 읽기 전용
 *
 * @example
 * // 기본 사용 (문자열)
 * const name = useQueryParam('name'); // string | null
 *
 * @example
 * // 기본값 설정 (null이 제거된 확정된 타입 사용 가능)
 * const page = useQueryParam('page', 1); // number
 * const sort = useQueryParam('sort', 'asc'); // string
 *
 * @example
 * // 디폴트 미지정 & 파서 사용 (타입 변환)
 * const tier = useQueryParam('tier', undefined, parseAsNumber); // number | null
 * const ids = useQueryParam('ids', undefined, parseAsArray); // string[] | null
 *
 * @returns value - default와 parser가 반영된 쿼리 값
 */
type InferReturnType<T, D> = D extends undefined ? T | null : T;

export function useQueryParam<T = string, D extends T | undefined | null = undefined>(
  key: string,
  defaultValue?: D,
  parser?: (value: string | null) => T | null,
): InferReturnType<T, D> {
  const searchParams = useSearchParams();

  const rawValue = searchParams?.get(key);
  const parsedValue = parser ? parser(rawValue) : (rawValue as T);
  const value = (parsedValue ?? defaultValue ?? null) as InferReturnType<T, D>;

  return value;
}
