# Sort Selector (FilterControls에 통합됨)

> **참고**: Sort Selector는 더 이상 독립 컴포넌트가 아닙니다. `FilterControls` 컴포넌트에 통합되었습니다.
> 상세 내용은 [Home Page](../page.md)의 FilterControls 섹션을 참조하세요.

## FilterControls 통합 구조

```
┌────────────────────────────────────────────────────────────────┐
│ [최신순 ▼]  [전체 폴더 ▼]  [⭐ 즐겨찾기]                      │
└────────────────────────────────────────────────────────────────┘
```

### Sort Selector (DropdownSelect)
- 옵션: 최신순 / 오래된순 / 가나다순
- DropdownSelect 컴포넌트 사용 (모달이 아닌 드롭다운)
- `sort`가 "latest"(기본값)이면 URL에서 제거

### Folder Selector (DropdownSelect)
- 옵션: 전체 폴더 / 폴더 없음 / [동적 폴더 목록]
- 전체보기 탭에서만 표시
- `useGetFolders` 훅으로 폴더 목록 동적 로드

### 즐겨찾기 필터 (토글 버튼)
- 활성 시: 노란색 배경 + 테두리
- 비활성 시: 기본 배경 + 테두리
- URL state: `?is_favorite=true`

## 정렬 로직

- **최신순**: `created_at DESC`
- **오래된순**: `created_at ASC`
- **가나다순**: 북마크 `title ASC` / 폴더 `name ASC`
