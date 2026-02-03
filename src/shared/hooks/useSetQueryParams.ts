import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

interface Options {
  scroll?: boolean;
  method?: "replace" | "push";
}

/**
 * useSetQueryParams - 여러 URL 쿼리 파라미터를 한번에 업데이트
 *
 * 여러 쿼리 값을 읽을 때는 각각 useQueryParam를 사용하고,
 * 일괄 업데이트만 필요할 때 이 hook을 사용
 *
 * @param options.scroll - replace 시 스크롤 여부 (기본값: true)
 *
 * @example
 * const setParams = useSetQueryParams();
 *
 * // 여러 개 한번에 업데이트
 * setParams({ name: 'jane', age: 30 });
 *
 * // null 전달 시 해당 param 제거
 * setParams({ name: null });
 *
 * @returns setValues - 여러 쿼리를 한번에 업데이트하는 함수
 */
export function useSetQueryParams(options?: Options) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const scroll = options?.scroll ?? false;
  const method = options?.method ?? "replace";

  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  const setValues = useCallback(
    (updates: Record<string, string | number | boolean | null>) => {
      const params = new URLSearchParams(searchParamsRef.current?.toString());

      for (const key in updates) {
        const value = updates[key];
        if (value === null || value === undefined) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      }

      router[method](`?${params.toString()}`, { scroll });
    },
    [router, method, scroll],
  );

  return setValues;
}
