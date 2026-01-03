# useQueryParam 훅 적용 리팩토링 체크리스트

## ✅ 작업 체크리스트

- [x] 훅 파일 복사 완료
- [x] 쿼리 파서 복사 (`parseAsBoolean`, `parseAsInteger`)
- [x] API 타입 수정 (쿼리 파라미터 `| null` 허용)
- [ ] 1. `src/app/(home)/page.tsx`
- [x] 2. `src/app/(home)/_components/view-tabs.tsx`
- [x] 3. `src/app/(home)/_components/search-bar.tsx`
- [x] 4. `src/app/(home)/_components/bookmarks-tab.tsx` (선택)
- [x] 5. `src/app/(home)/_components/folders-tab.tsx` (선택)
- [ ] 테스트 및 검증

---

## 📊 파일별 분석

| 우선순위 | 파일 | 쿼리 파라미터 수 | 읽기/쓰기 | 예상 개선 | 비고 |
|---------|------|-----------------|---------|----------|------|
| 🔴 높음 | `page.tsx` | 6개 | 읽기 + 쓰기 (3개 핸들러) | 45줄 → 15줄 (67%) | `view`, `folder_id`, `sort`, `is_favorite` |
| 🟡 중간 | `view-tabs.tsx` | 1개 | 읽기 + 쓰기 | 22줄 → 8줄 (64%) | `view` |
| 🟡 중간 | `search-bar.tsx` | 2개 | 읽기 + 쓰기 + state | 32줄 → 12줄 (62%) | `search`, `mode` |
| 🟢 낮음 | `bookmarks-tab.tsx` | 4개 | 읽기 전용 | 6줄 → 4줄 (33%) | `search`, `folder_id`, `sort`, `is_favorite` |
| 🟢 낮음 | `folders-tab.tsx` | 1개 | 읽기 전용 | 2줄 → 1줄 (50%) | `sort` |

**총 예상 개선**: ~107줄 → ~40줄 (62% 감소)

---

## 📝 작업 지시 방법

```
"1번 리팩토링 시작" 또는 "page.tsx 리팩토링"
```

---

## 🔧 주요 패턴 변환

### Before
```typescript
const searchParams = useSearchParams();
const router = useRouter();
const value = searchParams.get("key") || "default";

const handleChange = (newValue) => {
  const params = new URLSearchParams(searchParams.toString());
  if (newValue === "default") {
    params.delete("key");
  } else {
    params.set("key", newValue);
  }
  router.push(`/?${params.toString()}`, { scroll: false });
};
```

### After
```typescript
const value = useQueryParam('key', 'default');
const setParams = useSetQueryParams(['key']);

const handleChange = (newValue) => {
  setParams({ key: newValue === 'default' ? null : newValue });
};
```
