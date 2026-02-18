# Bookmark Card

## 레이아웃

```
┌────────────────────────────────────────────┐
│ 제목                               ☆   ⋮  │
│ [IMG]  설명 텍스트 (최대 3줄)...          │
└────────────────────────────────────────────┘
```

## 구조

### 1행: BookmarkCardHeader
- **제목**: `text-base font-semibold text-foreground truncate` (1줄, 말줄임)
- **즐겨찾기 버튼**: `FavoriteButton` 컴포넌트 (entityType: "bookmark")
- **더보기 버튼**: `MoreButton` 컴포넌트 (드롭다운: 수정/삭제)

### 2행: BookmarkCardContent
- **썸네일**: `BookmarkThumbnail` (56x56px, rounded-md, 썸네일 있을 때만 표시)
- **설명**: `text-sm text-muted`, `line-clamp-3` (최대 3줄, 설명 있을 때만 표시)
- 가로 배치: 썸네일(왼쪽) + 설명(오른쪽)

## Props

```typescript
interface Props {
  id: string;
  title: string;
  url: string;
  description?: string;
  createdAt: string;      // 포맷: "2024.12.08"
  platform: string;       // hostname (예: "example.com")
  thumbnail?: string;
  isFavorite: boolean;
}
```

> **참고**: `createdAt`과 `platform`은 props로 전달되지만 현재 화면에 렌더링하지 않습니다.

## 특징

- width: 100%, `p-4`, `border border-border-light rounded-lg bg-background`
- 카드 전체 클릭 시 `/bookmark/[id]` 상세 페이지로 이동
- 즐겨찾기/더보기 버튼은 이벤트 전파 중지
- 낙관적 즐겨찾기 토글 및 삭제
