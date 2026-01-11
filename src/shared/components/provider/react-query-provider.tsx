"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState, useMemo } from "react";
import { isApiError, isSchemaError } from "@/shared/utils/api/errors";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import {
  STALE_TIME,
  GC_TIME,
  PERSIST_TIME,
} from "@/shared/constants/queryConfig";

interface Props {
  children: ReactNode;
}

export default function ReactQueryProvider({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: STALE_TIME.DEFAULT,
            gcTime: GC_TIME, // 메모리 캐시 영구 유지
            retry: (failureCount, error) => {
              // ApiError이고 재시도 불가능한 경우 (4xx 에러) 재시도하지 않음
              if (isApiError(error) && !error.isRetryable) return false;
              // SchemaError는 재시도 불필요
              if (isSchemaError(error)) return false;
              // 기본값: 최대 3번까지 재시도
              return failureCount < 3;
            },
            throwOnError: (error) => {
              // 개발 환경에서 SchemaError는 Error Boundary로 던지기
              if (process.env.NODE_ENV === "development") {
                return isSchemaError(error);
              }
              return false;
            },
          },
          mutations: {
            retry: false,
            throwOnError: (error) => {
              // 개발 환경에서 SchemaError는 Error Boundary로 던지기
              if (process.env.NODE_ENV === "development") {
                return isSchemaError(error);
              }
              return false;
            },
          },
        },
      })
  );

  const persister = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createAsyncStoragePersister({
      storage: window.localStorage,
    });
  }, []);

  if (!persister) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: PERSIST_TIME, // 로컬스토리지 백업 영구 유지
      }}
    >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
