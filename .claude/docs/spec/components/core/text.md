# Text

타이포그래피 컴포넌트

## Props

```typescript
interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TextVariant;
  color?: TextColor;
  children: ReactNode;
  className?: string;
}
```

## Variants

| Variant | 스타일 |
|---------|--------|
| `title-1` | `text-2xl font-bold` |
| `title-2` | `text-xl font-bold` |
| `title-3` | `text-lg font-semibold` |
| `title-4` | `text-base font-semibold` |
| `body-1` | `text-base` |
| `body-2` (기본) | `text-sm` |
| `body-3` | `text-xs` |
| `body-4` | `text-[11px]` |

## Colors

| Color | 스타일 |
|-------|--------|
| `normal` (기본) | `text-foreground` |
| `light` | `text-muted` |
| `primary` | `text-primary` |
| `danger` | `text-danger` |

## 특징

- `<span>` 태그 렌더링
- `HTMLAttributes<HTMLSpanElement>` 전체 확장
- 외부 `className` 전달 가능 (기본 스타일 위에 추가)
