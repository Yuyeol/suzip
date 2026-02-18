# API 레이어 작성 규칙

## 3-Layer 패턴

새 API 추가 시 3개 파일을 모두 생성합니다:

1. **Schema** (`shared/api/schemas/`) — Zod로 response schema 정의, `z.infer`로 타입 추출
2. **API 함수** (`shared/api/`) — `fetcher` 사용 (`fetch` 직접 호출 금지), 상대 경로 `/api/*`
3. **React Query Hook** (`shared/hooks/queries/{feature}/`) — QueryKey factory의 queryKey 사용, `QUERY_CONFIG` 적용

## QueryKey Factory 패턴

`shared/utils/queryKeyFactory.ts`에서 관리:

```typescript
export const {feature}Keys = {
  all: ['{feature}'] as const,
  {category}: () => [...{feature}Keys.all, '{category}'] as const,
  {specific}: (params) => [...{feature}Keys.{category}(), '{specific}', params] as const,
};
```

`all` → `category` → `specific` 순서, params는 마지막, `as const` 필수

## 규칙

- **3개 파일 모두 생성** — schema만/hook만 생성 금지
- **fetcher 사용** — `fetch` 직접 호출 금지
- **QueryKey factory 확인** — 없으면 먼저 생성
