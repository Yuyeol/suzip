# Bookmark Edit Page

## 개요

기존 북마크를 수정하는 페이지. `BookmarkForm` 공통 컴포넌트를 `edit` 모드로 사용합니다.

---

## 경로

`/bookmark/[id]/edit`

---

## 페이지 구조

```
┌────────────────────────────────────────────┐
│ 링크 수정                                  │
├────────────────────────────────────────────┤
│ [URL Input]              [확인]            │
│ [썸네일 미리보기]                           │
│ [제목 Input - 기존값]                      │
│ [설명 Textarea - 기존값]                   │
│ [메모 Textarea - 기존값]                   │
│ [폴더 Selector ▼ - 기존값]                 │
│   [FolderForm - 인라인 생성]               │
│   [새 폴더 만들기 / 닫기]                  │
├────────────────────────────────────────────┤
│              [취소]  [수정]                 │
└────────────────────────────────────────────┘
```

---

## 핵심 컴포넌트

**[BookmarkForm](../../components/shared/bookmark-form.md)** (`mode="edit"`)
- `initialData`로 기존 데이터 prefill
- URL, 제목, 설명, 메모, 폴더 선택, 썸네일 미리보기

---

## 동작

### 수정
- `usePatchBookmark` 훅으로 API 호출
- 전송 필드: `url`, `title`, `description`, `folder_id`, `memo`
- 성공 시: `router.replace(/bookmark/${id})` (상세 페이지로 이동)
- 실패 시: alert("북마크 수정에 실패했습니다.")

### 취소
- `router.back()` (이전 페이지로 이동)

### 중복 제출 방지
- `isPending` 상태에 따라 수정 버튼 disabled

### 로딩/에러 상태
- 로딩 중: "로딩 중..." 텍스트 표시
- 북마크 없음: "북마크를 찾을 수 없습니다." 텍스트 표시

---

## 기술적 특징

- SSR 비활성화
- `useGetBookmark` 훅으로 기존 데이터 로드
- `initialData` prop으로 BookmarkForm에 전달 → `useEffect`에서 `reset()`으로 폼 초기화
