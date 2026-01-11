# Phase 8: 모바일 UX 및 폼 안정성

PWA 적용 후 모바일 네이티브 앱과 같은 사용자 경험을 위한 필수적인 UX 개선과 폼 처리 안정성을 강화합니다.

## 🎯 목표

- 모바일 입력 환경 최적화 (확대/축소 제어)
- 폴더 생성 UX 개선 (페이지 이동 없이 모달로 처리)
- 홈 폴더 탭 UI 개선 (리스트 형태로 관리 기능 통합)
- 중복 제출 방지 (연타 방지)

## 📋 작업 목록

### 8.1 모바일 확대/축소 차단

#### 문제점

- iOS Safari에서 input 포커스 시 자동 확대되어 불편함
- 핀치/스와이프로 확대/축소가 가능하여 앱 같은 느낌이 떨어짐

#### 해결 방안

- [x] **viewport 메타 태그 설정**

  - `maximum-scale=1.0`: 최대 확대 비율 제한
  - `user-scalable=no`: 사용자 확대/축소 비활성화
  - 적용 위치: `src/app/layout.tsx`의 viewport export
  - **참고**: iOS Safari는 viewport 메타 태그를 접근성 정책으로 무시함

- [x] **iOS Safari 및 Android 핀치 줌 차단**
  - `usePreventZoom` 훅 생성 (`src/shared/hooks/usePreventZoom.ts`)
  - iOS: gesturestart/change/end 이벤트 차단
  - Android: 멀티터치 및 더블탭 이벤트 차단
  - CSS: `touch-action: pan-y` 적용으로 상하 스크롤만 허용
  - 적용 위치: `src/shared/components/layout/client-layout.tsx`

---

### 8.2 홈 폴더 탭 UI 개선

#### 문제점

- 현재 2열 그리드 카드 형태로 폴더를 표시
- 폴더 관리(수정/삭제)를 위해 MoreButton 드롭다운을 거쳐야 함
- 폴더 수정 시 `/folder/manage` 페이지로 이동하여 복잡함

#### 해결 방안

- [x] **리스트 형태로 UI 변경**

  - 2열 그리드 → 한 행당 하나의 폴더 리스트로 변경
  - 각 행 구성: 폴더명 | 북마크 개수 | 즐겨찾기 토글 | 수정 버튼 | 삭제 버튼
  - `(home)/_components/folders-tab/` 폴더로 컴포넌트 분리

- [x] **폴더 생성 폼 상시 노출**

  - 폴더 탭 상단에 폴더 생성 폼 항상 표시
  - 수정 모드일 때는 생성 폼이 수정 폼으로 전환
  - `FolderForm` 컴포넌트로 생성/수정 통합 처리

- [x] **인라인 수정 기능**

  - 수정 버튼 클릭 시 상단 폼이 수정 모드로 전환
  - 해당 폴더는 목록에서 숨김
  - Input + 완료 + 취소 버튼으로 즉시 수정 가능

- [x] **FolderCard 컴포넌트 삭제**

  - 기존 카드 형태 제거
  - `folders-tab/folder-card.tsx`로 리스트 아이템 컴포넌트 생성

- [x] **MoreButton 북마크 전용으로 변경**

  - `entityType` prop 제거
  - 폴더 관련 코드 완전 삭제
  - 북마크 전용 컴포넌트로 간소화

- [x] **폴더 스키마 개선**
  - `folderWithoutCountSchema` (DB 테이블과 동일)
  - `folderSchema` (bookmark_count 포함 - 일반적으로 사용)
  - 생성/수정/즐겨찾기 응답에는 `bookmark_count` 불필요

---

### 8.3 북마크 폼 공통화 및 인라인 폴더 생성

#### 문제점

- 북마크 생성/수정 페이지 코드 중복 심화 (약 80% 이상의 로직이 중복)
- 북마크 생성/수정 중 폴더를 추가하려면 `/folder/manage` 페이지로 이동해야 함
- 페이지 이동 시 입력했던 북마크 정보가 모두 사라짐

#### 해결 방안

- [x] **북마크 공통 폼 컴포넌트 생성**

  - `src/app/bookmark/_components/bookmark-form.tsx` 생성
  - 생성/수정 모드 통합 처리
  - 중복되는 상태(`thumbnail`, `isFolderFormOpen`) 및 핸들러 통합

- [x] **인라인 폴더 생성 기능**

  - `BookmarkForm` 내에서 `FolderForm`을 직접 호출하여 인라인으로 폴더 생성
  - 페이지 이동 없이 즉시 폴더 추가 가능
  - 생성된 폴더의 ID를 폼에 자동 반영하여 데이터 유실 방지

- [x] **적용 페이지**
  - `/bookmark/create/page.tsx` 리팩토링 완료
  - `/bookmark/[id]/edit/page.tsx` 리팩토링 완료

---

### 8.4 폴더 관리 페이지 삭제

#### 변경 사항

- [x] **`/folder/manage` 페이지 삭제**

  - `src/app/folder/manage/page.tsx` 삭제 완료
  - `src/app/folder/manage/_components/` 디렉토리 삭제 완료
  - 폴더 관리는 홈 폴더 탭에서만 처리

- [x] **스펙 문서 삭제**
  - `.claude/docs/spec/pages/folder/manage/` 디렉토리 삭제 완료

---

### 8.5 중복 제출 방지

#### 문제점

- 폴더/북마크 생성 버튼 연타 시 여러 개가 생성됨
- 네트워크 지연 시 사용자가 여러 번 클릭할 가능성

#### 해결 방안

- [x] **Mutation `isPending` 상태 활용**

  - 제출 중에는 버튼 비활성화
  - 로딩 상태 표시 ('저장 중...', '수정 중...', '추가 중...')

- [x] **적용 대상**
  - 북마크 생성/수정 폼 (`BookmarkForm`)
  - 폴더 생성/수정 폼 (`FolderForm`)
  - 즐겨찾기 토글 (`FavoriteButton`)
  - 삭제 버튼 (`MoreButton`, 홈 폴더 탭)

---

## 💡 구현 방향성

### 모바일 확대/축소 차단

- viewport 메타 태그로 확대/축소 동작 완전 제어
- PWA 네이티브 앱처럼 동작하도록 설정

### 홈 폴더 탭

- 카드 형태에서 리스트 형태로 전환하여 한눈에 정보 파악 가능
- 수정/삭제 버튼을 각 행에 직접 배치하여 접근성 향상
- 인라인 수정으로 빠른 폴더명 변경 가능

### 모달 기반 폴더 생성

- Portal을 사용한 Modal 컴포넌트로 올바른 DOM 구조 유지
- 기존 Overlay 컴포넌트 재사용으로 코드 중복 최소화
- 모달 내에서 폴더 생성 완료 → React Query로 폴더 목록 자동 갱신
- 생성된 폴더의 ID를 부모 컴포넌트에 전달하여 자동 선택
- 페이지 이동 없이 모든 작업이 한 화면에서 완결

### 중복 제출 차단

- React Query의 `isPending` 상태를 버튼의 `disabled` 속성과 연결
- `isPending` 상태에 따라 버튼 텍스트 및 스타일 변경하여 시각적 피드백 제공

---

## 📊 예상 효과

### 사용자 경험

- **네이티브 앱 경험**: 확대/축소 차단으로 모바일 앱처럼 동작
- **간편한 폴더 관리**: 홈 화면에서 폴더 보기/수정/삭제를 한 번에 처리
- **원활한 폴더 생성**: 페이지 이동 없이 모달로 즉시 폴더 추가, 데이터 유실 없음
- **즉각적인 피드백**: 폴더 생성 후 자동 선택, 인라인 수정으로 빠른 변경
- **안정성**: 네트워크 지연 상황에서도 중복 생성 차단

### 개발

- viewport 메타 태그 1줄로 확대/축소 이슈 완전 해결
- Portal 기반 Modal 컴포넌트로 올바른 DOM 구조 유지
- 기존 Overlay 컴포넌트 재사용으로 코드 중복 최소화
- 기존 React Query 패턴 활용으로 추가 라이브러리 불필요
- `/folder/manage` 페이지 제거로 라우팅 복잡도 감소
