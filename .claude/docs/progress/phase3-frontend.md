# Phase 3: Frontend 기능 구현

## 상태: 진행 중

---

## 3.1 데이터 연동 (Mock → API)

### 홈 페이지

- [x] MOCK_LINKS 제거
- [x] MOCK_FOLDERS 제거
- [x] GET /api/bookmarks 호출
- [x] GET /api/folders 호출

### 폴더 관리

- [x] GET /api/folders - 목록
- [x] POST /api/folders - 생성
- [x] PATCH /api/folders/[id] - 수정
- [x] DELETE /api/folders/[id] - 삭제

### 북마크 생성

- [x] POST /api/bookmarks 연동
- [x] 성공 시 홈으로 리다이렉트

### 북마크 수정

- [x] GET /api/bookmarks/[id] - 데이터 로드
- [x] PATCH /api/bookmarks/[id] - 수정 저장

---

## 3.2 기능 로직 구현

### 검색

- [x] ~~디바운스 훅 구현~~ → 검색 버튼 방식으로 변경
- [x] 검색어 입력 → 검색 버튼 클릭/Enter → API 호출
- [x] GET /api/bookmarks?search=xxx
- [x] 검색 모드 선택 (전체/제목만/제목+설명)
- [x] URL state: `?search=xxx&mode=xxx`

### 정렬

- [x] URL searchParams로 상태 관리
- [x] 정렬 옵션 선택 → URL 업데이트
- [x] GET /api/bookmarks?sort=xxx&order=xxx (북마크)
- [x] GET /api/folders?sort=xxx&order=xxx (폴더)
- [x] 최신순/오래된순/가나다순 구현
- [x] 폴더보기 탭에서 정렬 적용

### 필터

- [x] 폴더별 필터링
- [x] GET /api/bookmarks?folder_id=xxx
- [x] 폴더 셀렉트박스 UI 구현 (ModalSelector)
- [x] 즐겨찾기 필터
- [x] GET /api/bookmarks?is_favorite=true
- [x] 즐겨찾기 토글 버튼 UI (홈 페이지)
- [x] 전체보기 탭에서만 폴더 필터/즐겨찾기 토글 표시
- [x] 폴더보기 탭에서는 정렬만 표시

### 즐겨찾기

- [x] POST /api/bookmarks/[id]/favorite (API 연동 완료)
- [x] 북마크 카드 별표 클릭 시 즐겨찾기 토글

### 삭제

- [x] 확인 모달 구현 (네이티브 confirm 다이얼로그 사용)
- [x] DELETE /api/bookmarks/[id] (완료 - 북마크 카드)
- [x] DELETE /api/folders/[id] (완료 - 폴더 카드)
- [x] 드롭다운 이벤트 전파 방지 처리

---

## 3.3 추가 페이지

### 북마크 상세

- [x] UI 완료 (`/bookmark/[id]`)
- [x] API 연동 (GET /api/bookmarks/[id])
- [x] 폴더명 표시 (useGetFolders)
- [x] 삭제 기능 연동

---

## 3.4 서버 상태 관리

### React Query 설정

- [x] @tanstack/react-query 설치
- [x] QueryClient Provider 설정
- [x] DevTools 설정 (개발 환경)

### 커스텀 훅

- [x] useGetBookmarks (목록, 검색, 필터, 정렬)
- [x] useGetBookmark (단일 조회)
- [x] usePostBookmark
- [x] usePatchBookmark
- [x] useDeleteBookmark
- [x] useGetFolders
- [x] usePostFolder
- [x] usePatchFolder
- [x] useDeleteFolder
- [x] usePostFavorite

---

## 구현 순서

1. **React Query 설정** (기반)
2. **폴더 기능** (간단, 의존성 없음)
   - API 연동
   - 커스텀 훅
3. **북마크 기본 CRUD**
   - 생성/수정/삭제
4. **검색/정렬/필터**
   - 디바운스
   - URL 상태 관리
5. **고급 기능**
   - 즐겨찾기
   - 낙관적 업데이트
6. **추가 페이지**
   - 프로필/마이페이지

---

## 다음 단계

Phase 3 완료 후:

- Phase 4: 인증 구현 (Supabase Auth)
- Phase 5: 최적화 및 배포
