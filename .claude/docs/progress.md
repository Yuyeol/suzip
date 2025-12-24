# Savvy 프로젝트 진행 상황

## 📊 현재 단계: **Phase 1 완료** (Prototyping ✅ → Backend → Frontend Logic)

---

## Phase 1: UI Prototyping ✅

### 완료된 작업
- [x] 프로젝트 설정 (Next.js 14, TypeScript, Tailwind)
- [x] UI 컴포넌트 11개 (Button, Input, Textarea, FormInput/Textarea)
- [x] 레이아웃 (Header, BottomNav, ClientLayout)
- [x] 테마 시스템 (다크모드, next-themes)
- [x] 페이지 4개 (홈, 북마크 생성/수정, 폴더 관리)
- [x] React Hook Form 통합 + 폼 유효성 검사
- [x] 라우팅/네비게이션 (useRouter, useParams)
- [x] 기능 컴포넌트 (LinkCard, FolderCard, SearchBar, SortSelector 등)

### 작동하는 기능
- ✅ 폼 입력/검증/제출 (console.log)
- ✅ 페이지 간 이동
- ✅ 다크모드 토글
- ✅ 모달 UI (폴더 선택, 정렬)
- ✅ 뷰 탭 전환 (all/folders)
- ✅ 폴더 CRUD (로컬 상태)

### UI만 있는 기능 (로직 없음)
- ⚠️ 검색바 (입력만, 검색/디바운스 없음)
- ⚠️ 정렬 (UI만, 실제 정렬 없음)
- ⚠️ 즐겨찾기 (버튼만, 상태 변경 없음)
- ⚠️ 더보기 (클릭만, 드롭다운 없음)

---

## Phase 2: Backend 구축 (진행 예정)

### 2.1 Supabase 설정
- [ ] `.env.local` 생성 (Supabase URL, anon key)
- [ ] Supabase 클라이언트 초기화 (`src/lib/supabase.ts`)

### 2.2 데이터베이스 스키마
- [ ] `bookmarks` 테이블 (id, type, title, url, description, folder_id, user_id, created_at, updated_at)
- [ ] `folders` 테이블 (id, name, user_id, created_at, updated_at)
- [ ] RLS 정책 설정

### 2.3 API Routes (10개)
**북마크 API**
- [ ] `POST /api/bookmarks` - 생성
- [ ] `GET /api/bookmarks` - 목록 (검색, 정렬, 폴더 필터)
- [ ] `GET /api/bookmarks/[id]` - 상세
- [ ] `PATCH /api/bookmarks/[id]` - 수정
- [ ] `DELETE /api/bookmarks/[id]` - 삭제
- [ ] `POST /api/bookmarks/[id]/favorite` - 즐겨찾기

**폴더 API**
- [ ] `POST /api/folders` - 생성
- [ ] `GET /api/folders` - 목록
- [ ] `PATCH /api/folders/[id]` - 수정
- [ ] `DELETE /api/folders/[id]` - 삭제

### 2.4 인증
- [ ] Supabase Auth 설정
- [ ] 로그인/회원가입 페이지
- [ ] 미들웨어 (보호된 라우트)

---

## Phase 3: Frontend 기능 구현 (18개 TODO)

### 3.1 데이터 연동 (Mock → API)
- [ ] 홈 - MOCK_LINKS/FOLDERS 제거, API 호출
- [ ] 북마크 생성 - API POST
- [ ] 북마크 수정 - API GET + PATCH
- [ ] 폴더 관리 - API CRUD

### 3.2 기능 로직 구현
- [ ] 검색 - 디바운스 + API 호출
- [ ] 정렬 - 실제 데이터 정렬 + URL 상태
- [ ] 필터 - 폴더별 필터링
- [ ] 즐겨찾기 - 상태 변경 + API
- [ ] 더보기 - 드롭다운 메뉴 (수정/삭제)

### 3.3 추가 페이지
- [ ] `/bookmark/[id]` - 북마크 상세 (선택사항)
- [ ] 프로필/마이페이지

### 3.4 서버 상태 관리 (선택)
- [ ] React Query 설치
- [ ] 커스텀 훅 (useBookmarks, useFolders)
- [ ] 캐싱/낙관적 업데이트

---

## 🎯 Next Steps

1. Supabase 프로젝트 생성 + `.env.local`
2. DB 스키마 마이그레이션
3. API Routes 10개 구현
4. Mock 데이터 → API 연동
