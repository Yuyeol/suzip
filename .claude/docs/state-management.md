# 상태 관리

## 서버 상태 (React Query)

API 데이터 및 서버에서 가져오는 모든 데이터에 사용

### 설정

- **Stale time**: `Infinity` (데이터를 stale 처리하지 않음)
- **GC time**: `Infinity` (메모리에서 삭제하지 않음)
- **refetchOnWindowFocus**: `true` (탭 전환 시 자동 갱신)
- **refetchOnMount**: `false` (마운트 시 재요청 안 함)
- **재시도**: 4xx/스키마 오류는 재시도 안 함, 기타 오류는 3회 재시도
- **설정 파일**: `shared/constants/queryConfig.ts`
- **위치**: `/shared/components/provider/react-query-provider.tsx`

### 패턴

```typescript
// Query
function useGetData(params) {
  return useQuery<TResponse, TApiError>({
    queryFn: () => getData(params),
    queryKey: queryKeys.data(params),
    enabled: !!params.required,
  });
}

// Mutation
function usePostData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.related(),
        refetchType: 'active',
      });
    },
  });
}
```

## 클라이언트 상태

### 기본: useState

**UI 상태는 항상 `useState` 우선**

Props로 전달하거나 공통 부모로 state 끌어올리기

### Zustand (드문 경우만)

**위치**: `app/{route}/_store/`

**사용 조건**:

- 클라이언트 전용 임시 상태 (폼 초안, 튜토리얼 진행 상황)
- 여러 컴포넌트 간 공유 UI 상태 (모달 상태 + 데이터)
- 실시간 입력 추적 (초안 vs 확정)

## URL 상태 (searchParams)

공유 및 북마크 가능한 상태에 사용

### Server Components

```typescript
interface IProps {
  searchParams: { year: string; model: string };
}

export default async function Page({ searchParams }: IProps) {
  const { year, model } = searchParams;
  return <div>{/* ... */}</div>;
}
```

### Client Components

```typescript
// 읽기
const tier = useQueryParam('tier', undefined, parseAsNumber);
const name = useQueryParam('name', 'default');

// 쓰기 (일괄 업데이트)
const setParams = useSetQueryParams(['model', 'year', 'fuel']);
setParams({ model: 'K5', year: '2023' });
```

## 의사결정 트리

```
서버에서 오는 데이터인가?
├─ YES → React Query
└─ NO → 공유 가능해야 하는가?
    ├─ YES → URL searchParams
    └─ NO → 글로벌하게 사용되는가?
        ├─ YES → Zustand (드물게)
        └─ NO → useState
```
