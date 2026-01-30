# BookmarkForm (공통 폼 컴포넌트)

> Phase 8에서 생성/수정 페이지의 중복 코드를 통합하여 도입되었습니다.

## 개요

북마크 생성/수정에 사용되는 공통 폼 컴포넌트. `mode` prop으로 생성/수정 모드를 구분합니다.

## Props

```typescript
interface BookmarkFormProps {
  mode: "create" | "edit";
  initialData?: {
    url: string;
    title: string;
    description?: string | null;
    memo?: string | null;
    folder_id?: string | null;
    thumbnail?: string | null;
  };
  onSubmit: (data: BookmarkFormData & { thumbnail: string | null }) => void;
  isPending: boolean;
}

interface BookmarkFormData {
  url: string;
  title: string;
  description: string;
  memo: string;
  folderId?: string;
}
```

## 레이아웃

```
┌────────────────────────────────────────────┐
│ {제목: "링크 추가" | "링크 수정"}          │
├────────────────────────────────────────────┤
│ [UrlInput]                    [확인]       │
│ [썸네일 미리보기 - 있을 때만]               │
│ [제목 FormInput - 필수]                    │
│ [설명 FormTextarea]                        │
│ [메모 FormTextarea]                        │
│ [FolderSelector ▼ - 필수]                  │
│   [FolderForm - 인라인 생성]               │
│   [새 폴더 만들기 / 닫기]                  │
├────────────────────────────────────────────┤
│              [취소]  [{저장|수정}]          │
└────────────────────────────────────────────┘
```

## 폼 필드 상세

### URL (UrlInput)
- 필수
- http:// 또는 https:// 패턴 검증
- "확인" 버튼으로 OG 메타데이터 추출
- 메타데이터 성공 시 제목/설명 자동 채우기 + 썸네일 설정

### 썸네일 미리보기
- `thumbnail` state가 있을 때만 표시
- `h-48`, `rounded-lg`, `object-cover`
- OG 메타데이터에서 자동 설정 또는 기존 데이터에서 로드

### 제목 (FormInput)
- **필수** (`rules.required`)
- 최대 100자
- OG 메타데이터에서 자동 채우기 (값이 있으면 덮어씀)

### 설명 (FormTextarea)
- 선택
- 최대 500자, 3줄
- OG 메타데이터에서 자동 채우기 (값이 있으면 덮어씀)

### 메모 (FormTextarea)
- 선택
- 최대 500자, 3줄

### 폴더 선택 (FolderSelector)
- **필수** (`rules.required`)
- DropdownSelect 기반 드롭다운
- "폴더 없음" 옵션 포함 (value: undefined)

### 인라인 폴더 생성
- `CreateFolderButton`으로 토글
- 열림 시 `FolderForm` (create 모드) 표시
- 폴더 생성 성공 시 새 폴더 ID를 `folderId`에 자동 설정

## 버튼

- **취소**: `variant="neutral"`, `router.back()` 호출
- **저장/수정**: `variant="primary"`, `isPending` 시 disabled
- 모드별 라벨: create → "저장", edit → "수정"

## 기술적 특징

- React Hook Form (`useForm`)
- edit 모드: `initialData` 변경 시 `reset()`으로 폼 초기화
- `thumbnail`은 폼 외부 state로 관리 (onSubmit 시 합침)
- `isFolderFormOpen` state로 인라인 폴더 생성 폼 토글
