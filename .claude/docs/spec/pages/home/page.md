# Home Page

## 개요

사용자가 저장한 링크와 폴더를 관리하는 메인 페이지

---

## 페이지 구조

```
┌────────────────────────────────────────────┐
│ [Header]                                   │
├────────────────────────────────────────────┤
│ [Search Bar]                               │
├────────────────────────────────────────────┤
│ [View Tabs]                                │
├────────────────────────────────────────────┤
│ [Sort Selector]                            │
├────────────────────────────────────────────┤
│                                            │
│ [Content Area]                             │
│   - 전체보기: Link Cards (1-column)        │
│   - 폴더보기: Folder Cards (2-column)      │
│                                            │
└────────────────────────────────────────────┘
│ [Bottom Navigation]                        │
└────────────────────────────────────────────┘
```

---

## 컴포넌트 구성

### 고정 영역

**[Header](../../components/header.md)**
- 상단 고정
- 로고 + 아바타 아이콘

**[Bottom Navigation](../../components/nav-bar.md)**
- 하단 고정
- 저장목록 / 추가 버튼

### 뷰 전환

**[View Tabs](./components/view-tabs.md)**
- 전체보기 / 폴더보기 탭
- URL state로 관리 (`?view=all` / `?view=folders`)

### 필터 & 정렬

**[Search Bar](./components/search-bar.md)**
- 헤더 바로 아래 위치
- 전체보기: 링크 제목 검색
- 폴더보기: 비활성화 또는 숨김
- 500ms debounce

**[Sort Selector](./components/sort-selector.md)**
- 전체보기: 최신순 / 오래된순 / 가나다순 (링크 정렬)
- 폴더보기: 가나다순 / 생성순 (폴더 정렬)
- 모달 방식

### 콘텐츠 영역

**전체보기 모드**
- [Link Card](./components/link-card.md) 목록
- 1-column 레이아웃 (width: 100%)
- 무한 스크롤 또는 페이지네이션

**폴더보기 모드**
- [Folder Card](./components/folder-card.md) 그리드
- 2-column 레이아웃
- 폴더 클릭 시 해당 폴더의 링크 목록으로 필터링

---

## 상태 관리

### URL State (공유/북마크 가능)
- `view`: `all` | `folders` (기본: `all`)
- `sort`: `latest` | `oldest` | `name` (기본: `latest`)
- `search`: 검색어 (선택)
- `folder`: 폴더 ID (선택)

### Client State
- 검색 입력값 (debounce 처리)
- 모달 열림/닫힘 상태

### Server State
- 링크 목록 (React Query)
- 폴더 목록 (React Query)

---

## 사용자 플로우

### 기본 플로우
1. 페이지 진입 → 전체보기 모드 (최신순)
2. 검색 입력 → 500ms 후 API 호출 → 결과 필터링
3. 정렬 변경 → 모달 오픈 → 옵션 선택 → 즉시 반영

### 폴더 플로우
1. 폴더보기 탭 클릭 → 폴더 카드 그리드 표시
2. 폴더 클릭 → 전체보기 탭으로 전환 + 해당 폴더 필터링
3. 검색바 X 버튼 or 전체보기 재클릭 → 필터 해제

### 추가 플로우
1. 하단 추가 버튼 클릭 → `/items/new` 페이지 이동
2. 링크 카드 클릭 → `/items/[id]` 페이지 이동

---

## 특징

- 모바일 우선 디자인
- URL 기반 상태 관리 (공유/북마크 지원)
- 실시간 검색 (debounce)
- 직관적인 탭 전환
- 폴더 필터링 지원
