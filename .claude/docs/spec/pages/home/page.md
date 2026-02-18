# Home Page

## 개요

사용자가 저장한 북마크와 폴더를 관리하는 메인 페이지

---

## 페이지 구조

```
┌────────────────────────────────────────────┐
│ [Search Bar]                               │
├────────────────────────────────────────────┤
│ [View Tabs]                                │
├────────────────────────────────────────────┤
│ [FilterControls]                           │
│   [Sort ▼] [Folder ▼] [⭐ 즐겨찾기]       │
├────────────────────────────────────────────┤
│                                            │
│ [Content Area]                             │
│   - 전체보기: BookmarkCard (1-column)      │
│   - 폴더보기: FolderListItem (1-column)    │
│                                            │
└────────────────────────────────────────────┘
│ [Bottom Navigation]                        │
└────────────────────────────────────────────┘
```

---

## 컴포넌트 구성

### 고정 영역

**[Bottom Navigation](../../components/nav-bar.md)**
- 하단 고정
- 저장목록 / 추가 / 프로필 버튼

### 뷰 전환

**[View Tabs](./components/view-tabs.md)**
- 전체보기 / 폴더보기 탭
- URL state로 관리 (`?view=folders`, 기본값은 all)
- 탭 전환 시 모든 필터 초기화 (search, folder_id, is_favorite, sort)

### 필터 & 정렬

**[Search Bar](./components/search-bar.md)**
- 헤더 바로 아래 위치
- 검색 범위: 전체 / 제목만 / 제목+설명
- 검색 버튼 클릭 또는 Enter 키로 실행
- URL state: `?search=xxx&mode=xxx`

**FilterControls** (통합 컴포넌트)
- Sort Selector + Folder Selector + 즐겨찾기 필터를 하나로 통합
- 모두 DropdownSelect 컴포넌트 사용
- 정렬: 최신순 / 오래된순 / 가나다순 (`?sort=xxx`)
- 폴더 필터: 전체 폴더 / 폴더 없음 / 개별 폴더 (`?folder_id=xxx`)
- 즐겨찾기 필터: 토글 버튼 (`?is_favorite=true`)
- 폴더 필터는 전체보기 탭에서만 표시
- 즐겨찾기 필터는 전체보기/폴더보기 모두 표시

### 콘텐츠 영역

**전체보기 모드**
- [BookmarkCard](./components/bookmark-card.md) 목록
- 1-column 레이아웃 (width: 100%)
- 검색, 폴더 필터, 정렬, 즐겨찾기 필터 적용

**폴더보기 모드**
- [FolderListItem](./components/folder-list-item.md) 리스트
- 1-column 리스트 레이아웃
- 상단에 폴더 생성 폼 (FolderForm) 상시 노출
- 인라인 수정/삭제 지원
- 폴더 클릭 시 전체보기 탭으로 전환 + 해당 폴더로 필터링

---

## 상태 관리

### URL State (공유/북마크 가능)
- `view`: `all` | `folders` (기본: `all`)
- `sort`: `latest` | `oldest` | `name` (기본: `latest`)
- `search`: 검색어 (선택)
- `mode`: 검색 범위 `all` | `title` | `title_description` (기본: `all`)
- `folder_id`: 폴더 ID (선택, `"null"` 값이면 미분류 북마크)
- `is_favorite`: `true` | 없음 (기본: 없음)

### Client State
- 검색 입력값 (검색 버튼 방식)
- 검색 모드 선택값
- 폴더 수정 중인 ID (editingId)

### Server State
- 북마크 목록 (React Query)
- 폴더 목록 (React Query)

---

## 사용자 플로우

### 기본 플로우
1. 페이지 진입 → 전체보기 모드 (최신순)
2. 검색 입력 → 검색 버튼 클릭 or Enter → URL 업데이트 → 결과 필터링
3. 정렬 변경 → 드롭다운에서 옵션 선택 → URL 업데이트 → 즉시 반영
4. 폴더 필터 → 드롭다운에서 폴더 선택 → URL 업데이트 → 즉시 반영
5. 즐겨찾기 필터 → 토글 버튼 클릭 → URL 업데이트 → 즉시 반영

### 폴더 플로우
1. 폴더보기 탭 클릭 → URL: `?view=folders` → 폴더 리스트 표시 (필터 초기화)
2. 폴더 클릭 → URL: `/?folder_id=xxx` (전체보기로 자동 전환)
3. 폴더 생성 → 상단 FolderForm에서 즉시 생성
4. 폴더 수정 → 수정 버튼 클릭 → 인라인 FolderForm으로 전환
5. 폴더 삭제 → 삭제 버튼 → confirm 다이얼로그 (북마크 개수에 따라 메시지 다름)

### 추가 플로우
1. 하단 추가 버튼 클릭 → `/bookmark/create` 페이지 이동
2. 북마크 카드 클릭 → `/bookmark/[id]` 페이지 이동

---

## 기술적 특징

- 모바일 우선 디자인
- URL 기반 상태 관리 (공유/북마크 지원)
- SSR 비활성화 (dynamic import with `{ ssr: false }`)
- 검색 버튼 방식 (Enter 키 지원)
- DropdownSelect 컴포넌트로 필터/정렬 통일
- 낙관적 UI 업데이트 (즐겨찾기, 삭제 등)
