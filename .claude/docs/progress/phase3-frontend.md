# Phase 3: Frontend 기능 구현

## 상태: 대기 중 (Phase 2 완료 후 시작)

---

## 3.1 데이터 연동 (Mock → API)

### 홈 페이지

- [ ] MOCK_LINKS 제거
- [ ] MOCK_FOLDERS 제거
- [ ] GET /api/bookmarks 호출
- [ ] GET /api/folders 호출

### 폴더 관리

- [ ] GET /api/folders - 목록
- [ ] POST /api/folders - 생성
- [ ] PATCH /api/folders/[id] - 수정
- [ ] DELETE /api/folders/[id] - 삭제

### 북마크 생성

- [ ] POST /api/bookmarks 연동
- [ ] 성공 시 홈으로 리다이렉트

### 북마크 수정

- [ ] GET /api/bookmarks/[id] - 데이터 로드
- [ ] PATCH /api/bookmarks/[id] - 수정 저장

---

## 3.2 기능 로직 구현

### 검색

- [ ] 디바운스 훅 구현 (useDebounce)
- [ ] 검색어 입력 → API 호출
- [ ] GET /api/bookmarks?search=xxx

### 정렬

- [ ] URL searchParams로 상태 관리
- [ ] 정렬 옵션 선택 → URL 업데이트
- [ ] GET /api/bookmarks?sort=xxx&order=xxx

### 필터

- [ ] 폴더별 필터링
- [ ] GET /api/bookmarks?folder_id=xxx
- [ ] 즐겨찾기 필터
- [ ] GET /api/bookmarks?is_favorite=true

### 즐겨찾기

- [ ] POST /api/bookmarks/[id]/favorite
- [ ] UI 즉시 업데이트 (낙관적 업데이트)

### 삭제

- [ ] 확인 모달 구현
- [ ] DELETE /api/bookmarks/[id]
- [ ] DELETE /api/folders/[id]

---

## 3.3 추가 페이지

### 북마크 상세

- [x] UI 완료 (`/bookmark/[id]`)
- [ ] API 연동

### 프로필/마이페이지

- [ ] 페이지 생성
- [ ] 사용자 정보 표시
- [ ] 통계 (북마크 수, 폴더 수 등)

---

## 3.4 서버 상태 관리

### React Query 설정

- [ ] @tanstack/react-query 설치
- [ ] QueryClient Provider 설정
- [ ] DevTools 설정 (개발 환경)

### 커스텀 훅

- [ ] useBookmarks (목록, 검색, 필터)
- [ ] useBookmark (단일 조회)
- [ ] useCreateBookmark
- [ ] useUpdateBookmark
- [ ] useDeleteBookmark
- [ ] useFolders
- [ ] useCreateFolder
- [ ] useUpdateFolder
- [ ] useDeleteFolder
- [ ] useToggleFavorite

### 고급 기능

- [ ] 캐싱 전략 설정
- [ ] 낙관적 업데이트 (Optimistic UI)
- [ ] 에러 처리 및 재시도
- [ ] 로딩 상태 관리

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
