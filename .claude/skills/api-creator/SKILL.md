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

## Endpoint Pattern

상대 경로 `/api/*` 사용:

```typescript
const url = "/api/bookmarks";
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

### 1. Schema (`shared/api/schemas/bookmark.schema.ts`)

```typescript
export const bookmarkSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  description: z.string().nullable(),
  folder_id: z.string().nullable(),
  is_favorite: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const bookmarksGetResponse = z.object({
  data: z.array(bookmarkSchema),
});

export type Bookmark = z.infer<typeof bookmarkSchema>;
```

### 2. API (`shared/api/bookmarks.ts`)

```typescript
export async function getBookmarks(params: {
  search: string | null;
  sort: string | null;
  order: "asc" | "desc" | null;
}): Promise<Bookmark[]> {
  const url = buildUrlWithParams("/api/bookmarks", params);
  const response = await fetcher(url, bookmarksGetResponse);
  return response.data;
}
```

### 3. Hook (`shared/hooks/queries/bookmarks/useGetBookmarks.ts`)

```typescript
export function useGetBookmarks(params: { ... }) {
  return useQuery({
    queryKey: bookmarkKeys.list(params),
    queryFn: () => getBookmarks(params),
    ...QUERY_CONFIG.BOOKMARKS,
  });
}
```
