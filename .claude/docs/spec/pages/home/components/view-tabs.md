# View Tabs

## 레이아웃

```
┌────────────────────────────────────────────┐
│ [전체보기]  [폴더보기]                      │
└────────────────────────────────────────────┘
```

## 기능

**전체보기 탭**
- 모든 북마크 카드 표시
- FilterControls에서 정렬 + 폴더 필터 + 즐겨찾기 필터 활성화
- URL: `?view=all` (기본값)

**폴더보기 탭**
- 폴더 리스트 (1-column)
- FilterControls에서 정렬 + 즐겨찾기 필터 활성화 (폴더 필터 숨김)
- URL: `?view=folders`

## 구현

- **Props 없음**: 자체적으로 `useQueryParam`으로 URL 읽기
- **URL 관리**: `useSetQueryParams` 훅으로 URL 업데이트
- **기본값**: view 파라미터가 없으면 "all" (전체보기)
- **탭 전환 시 필터 초기화**: `search`, `folder_id`, `is_favorite`, `sort`를 모두 null로 초기화

## 특징

- 탭 전환 시 모든 필터/검색 상태 초기화 (깨끗한 상태로 전환)
- 선택된 탭: `text-primary` + `border-primary` 밑줄
- 비선택 탭: `text-muted` + `border-transparent`
- `w-full` 컨테이너, 내부 `flex gap-6` 레이아웃
- `border-b border-border-light`로 하단 구분선

## 상태 관리

- URL 파라미터로 상태 저장
- 새로고침 시에도 선택 유지
- 공유 시 같은 뷰로 열림
- 부모 컴포넌트에서 별도 state 관리 불필요
