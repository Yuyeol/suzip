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

- [ ] **리스트 형태로 UI 변경**

  - 2열 그리드 → 한 행당 하나의 폴더 리스트로 변경
  - 각 행 구성: 폴더명 | 북마크 개수 | 즐겨찾기 토글 | 수정 버튼 | 삭제 버튼
  - `(home)/_components/folders-tab.tsx` 수정

- [ ] **인라인 수정 기능**

  - 수정 버튼 클릭 시 해당 행이 수정 모드로 전환
  - Input + 완료/취소 버튼으로 즉시 수정 가능
  - 수정 완료 시 다시 일반 모드로 전환

- [ ] **FolderCard 컴포넌트 제거**

  - 카드 형태가 아닌 리스트 행으로 표시하므로 `folder-card.tsx` 삭제
  - `folders-tab.tsx`에 직접 리스트 항목 렌더링

- [ ] **MoreButton 폴더 수정 기능 제거**
  - 폴더의 경우 수정 옵션을 드롭다운에서 제거
  - 북마크만 수정 옵션 유지
  - `src/shared/components/more-button.tsx` 수정

---

### 8.3 북마크 페이지 폴더 생성 모달

#### 문제점

- 북마크 생성/수정 중 폴더를 추가하려면 `/folder/manage` 페이지로 이동해야 함
- 페이지 이동 시 입력했던 북마크 정보가 모두 사라짐
- 폴더 생성 후 돌아와서 다시 입력해야 하는 불편함

#### 해결 방안

- [ ] **Modal 컴포넌트 생성**

  - `src/shared/components/modal/index.tsx` 생성
  - Portal을 사용하여 body에 직접 렌더링
  - children을 받아 모달 내용 표시
  - Props: `isOpen`, `onClose`, `children`

- [ ] **Overlay 컴포넌트 재사용**

  - 기존 `src/shared/components/overlay.tsx` 활용
  - 배경 딤 처리 및 클릭 시 모달 닫기

- [ ] **ModalContent 컴포넌트 생성**

  - `src/app/bookmark/_components/modal-content.tsx` 생성
  - 테두리를 가진 박스 UI (shared가 아닌 북마크 페이지 전용)
  - 폴더 생성 폼 포함: Input + 생성 버튼

- [ ] **CreateFolderButton 수정**

  - `/folder/manage`로 이동하는 대신 모달 오픈
  - `src/app/bookmark/_components/create-folder-button.tsx` 수정

- [ ] **폴더 생성 후 자동 선택**

  - 모달에서 폴더 생성 성공 시 모달 닫힘
  - 생성된 폴더가 FolderSelector에 자동으로 선택됨
  - 북마크 입력 데이터는 그대로 유지

- [ ] **적용 페이지**
  - `/bookmark/create/page.tsx`
  - `/bookmark/[id]/edit/page.tsx`

---

### 8.4 폴더 관리 페이지 삭제

#### 변경 사항

- [ ] **`/folder/manage` 페이지 삭제**

  - `src/app/folder/manage/page.tsx` 삭제
  - `src/app/folder/manage/_components/` 디렉토리 삭제
  - 폴더 관리는 홈 폴더 탭에서만 처리

- [ ] **스펙 문서 삭제**
  - `.claude/docs/spec/pages/folder/manage/` 디렉토리 삭제

---

### 8.5 중복 제출 방지

#### 문제점

- 폴더/북마크 생성 버튼 연타 시 여러 개가 생성됨
- 네트워크 지연 시 사용자가 여러 번 클릭할 가능성

#### 해결 방안

- [ ] **Mutation `isPending` 상태 활용**

  - 제출 중에는 버튼 비활성화
  - 로딩 상태 표시 ('저장 중...', '추가 중...')

- [ ] **적용 대상**
  - 북마크 생성/수정 폼 (`/bookmark/create`, `/bookmark/[id]/edit`)
  - 폴더 생성 폼 (모달 내부)
  - 폴더 수정 폼 (홈 폴더 탭 인라인)
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
