# Text

## Props

```typescript
variant?: 'title-1' | 'title-2' | 'title-3' | 'title-4' | 'body-1' | 'body-2' | 'body-3' | 'body-4'
color?: 'normal' | 'primary' | 'danger' | 'light'
```

## Variants

### Title
- **title-1**: 가장 큰 제목 (2xl, bold)
- **title-2**: 큰 제목 (xl, bold)
- **title-3**: 중간 제목 (lg, semibold)
- **title-4**: 작은 제목 (base, semibold)

### Body
- **body-1**: 기본 본문 (base, normal)
- **body-2**: 작은 본문 (sm, normal)
- **body-3**: 더 작은 본문 (xs, normal)
- **body-4**: 작은 본문 강조 (xs, medium)

## Colors

- **normal**: 기본 텍스트 색상
- **primary**: 주요 색상
- **danger**: 경고/삭제 색상
- **light**: 연한 회색

## Usage

```tsx
<Text variant="title-1">페이지 제목</Text>
<Text variant="body-2" color="light">부가 설명</Text>
```
