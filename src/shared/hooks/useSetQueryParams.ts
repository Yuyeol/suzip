import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * useSetQueryParams - 여러 URL 쿼리 파라미터를 한번에 업데이트
 *
 * 여러 쿼리 값을 읽을 때는 각각 useQueryParam를 사용하고,
 * 일괄 업데이트만 필요할 때 이 hook을 사용
 *
 * @param keys - 업데이트할 쿼리 파라미터 키 배열
 *
 * @example
 * // 여러 개 한번에 업데이트
 * setParams({ name: 'jane', age: 30 });
 *
 * // null 전달 시 해당 param 제거
 * setParams({ name: null });
 *
 * @returns setValues - 여러 쿼리를 한번에 업데이트하는 함수
 */
export function useSetQueryParams(keys: string[]) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const setValues = useCallback(
    (updates: Partial<Record<string, string | number | boolean | null>>) => {
      const params = new URLSearchParams(searchParams?.toString());

      for (const key in updates) {
        // keys 배열에 포함된 키만 업데이트
        if (!keys.includes(key)) continue;

        const value = updates[key];
        if (value === null || value === undefined) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      }

      router.replace(`?${params.toString()}`);
    },
    [keys, searchParams, router],
  );

  return setValues;
}
