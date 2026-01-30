# Create Folder Button

## 개요

북마크 폼에서 인라인 폴더 생성 폼을 토글하는 버튼

> **참고**: Phase 8에서 페이지 이동 방식에서 인라인 토글 방식으로 변경되었습니다.

## 레이아웃

```
닫힘 상태:                열림 상태:
┌────────────────┐       ┌──────────┐
│ 새 폴더 만들기 +│       │ 닫기  ✕  │
└────────────────┘       └──────────┘
```

## Props

```typescript
interface Props {
  isOpen: boolean;
  onToggle: () => void;
}
```

## 기능

- **닫힘 상태**: "새 폴더 만들기" + `Plus` 아이콘 (16px)
- **열림 상태**: "닫기" + `X` 아이콘 (16px)
- 클릭 시 `onToggle` 콜백 호출

## 스타일

- `text-sm text-primary`
- `mt-2 ml-auto` (우측 정렬)
- `type="button"` (폼 제출 방지)
- `flex items-center gap-1`

## BookmarkForm 내 동작 흐름

1. 버튼 클릭 → `isFolderFormOpen` 토글
2. 열림 시: `FolderForm` (create 모드) 표시
3. 폴더 생성 성공 → 새 폴더 ID를 `folderId`에 자동 설정 + 폼 닫기
4. 닫기 클릭 → `FolderForm` 숨김
