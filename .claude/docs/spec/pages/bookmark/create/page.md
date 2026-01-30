# Bookmark Create Page

## 개요

새 북마크를 생성하는 페이지. `BookmarkForm` 공통 컴포넌트를 `create` 모드로 사용합니다.

---

## 경로

`/bookmark/create`

---

## 페이지 구조

```
┌────────────────────────────────────────────┐
│ 링크 추가                                  │
├────────────────────────────────────────────┤
│ [URL Input]              [확인]            │
│ [썸네일 미리보기]                           │
│ [제목 Input]                               │
│ [설명 Textarea]                            │
│ [메모 Textarea]                            │
│ [폴더 Selector ▼]                          │
│   [FolderForm - 인라인 생성]               │
│   [새 폴더 만들기 / 닫기]                  │
├────────────────────────────────────────────┤
│              [취소]  [저장]                 │
└────────────────────────────────────────────┘
```

---

## 핵심 컴포넌트

**[BookmarkForm](../components/shared/bookmark-form.md)** (`mode="create"`)
- URL, 제목, 설명, 메모, 폴더 선택, 썸네일 미리보기
- 인라인 폴더 생성 지원

---

## 동작

### 저장
- `usePostBookmark` 훅으로 API 호출
- 전송 필드: `url`, `title`, `description`, `folder_id`, `is_favorite`, `thumbnail`, `memo`
- 성공 시: `router.replace("/")` (홈으로 이동)
- 실패 시: alert("북마크 저장에 실패했습니다.")

### 취소
- `router.back()` (이전 페이지로 이동)

### 중복 제출 방지
- `isPending` 상태에 따라 저장 버튼 disabled

---

## 기술적 특징

- SSR 비활성화 (`dynamic(() => Promise.resolve(...), { ssr: false })`)
- React Hook Form으로 폼 상태 관리
