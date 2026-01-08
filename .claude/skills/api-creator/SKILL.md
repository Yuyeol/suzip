---
name: api-creator
description: Create API layer following 3-layer pattern (schema → api → hook)
---

# API Creator

## Our 3-Layer Pattern

이 프로젝트는 Schema → API → Hook 패턴을 따릅니다:

1. **Schema 생성** (`shared/api/schemas/`)

   - Zod로 response schema 정의
   - `z.infer`로 타입 추출

2. **API 함수 생성** (`shared/api/`)

   - `fetcher` 사용 (`fetch`/`axios` 직접 호출 금지)
   - 엔드포인트 타입 선택 (Admin/Auth vs Public)

3. **React Query Hook 생성** (`shared/hooks/queries/{feature}/`)
   - QueryKey factory 확인 후 진행
   - factory의 queryKey 사용

## Endpoint Selection Guide

### Admin/Auth Endpoints (세션 필요)

Use `/api/management/*` with credentials:

```typescript
const url = "/api/management/login";
return fetcher(url, schema, {
  method: "POST",
  credentials: "include", // 필수
});
```

### Public Endpoints (세션 불필요)

Use `${API_BASE_URL}/api/*`:

```typescript
const url = `${API_BASE_URL}/api/cars/search`;
return fetcher(url, schema);
```

## QueryKey Factory Pattern

계층 구조 사용:

```typescript
export const {feature}Keys = {
  all: ['{feature}'] as const,
  {category}: () => [...{feature}Keys.all, '{category}'] as const,
  {specific}: (params) => [...{feature}Keys.{category}(), '{specific}', params] as const,
};
```

**Rules**: `all` → `category` → `specific`, params last, `as const` required

## Project-Specific Rules

- **3개 파일 모두 생성** - schema만/hook만 생성 금지
- **fetcher 사용** - fetch 직접 호출 금지
- **QueryKey factory 확인** - 없으면 중단
- **위치** - `shared/api/`, `shared/api/schemas/`, `shared/hooks/`

## Example Output (3-Layer)

### 1. Schema (`domains/buy/carSearch/schemas/search.schema.ts`)

```typescript
export const searchResponseSchema = z.object({
  cars: z.array(
    z.object({
      id: z.string(),
      model: z.string(),
      price: z.number(),
    })
  ),
  total: z.number(),
});

export type TSearchResponse = z.infer<typeof searchResponseSchema>;
```

### 2. API (`domains/buy/carSearch/api/searchCars.api.ts`)

```typescript
export const searchCars = async (params: { keyword: string }) => {
  const url = `${API_BASE_URL}/api/cars/search?keyword=${params.keyword}`;
  return fetcher(url, searchResponseSchema);
};
```

### 3. Hook (`domains/buy/carSearch/hooks/queries/useSearchCars.ts`)

```typescript
export function useSearchCars(keyword: string) {
  return useQuery({
    queryFn: () => searchCars({ keyword }),
    queryKey: carSearchKeys.search(keyword),
    enabled: !!keyword,
  });
}
```
