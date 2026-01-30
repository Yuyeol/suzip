# Button

## Props

```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'primary-light' | 'neutral' | 'danger' | 'danger-light' | 'muted' | 'muted-light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

## Variants

| Variant | 스타일 |
|---------|--------|
| `primary` (기본) | `bg-primary text-white` |
| `primary-light` | `bg-primary-light text-white` |
| `neutral` | `bg-white text-black border border-border` |
| `danger` | `bg-danger text-white` |
| `danger-light` | `bg-danger-light text-white` |
| `muted` | `bg-muted text-white` |
| `muted-light` | `bg-muted-light text-white` |

## Sizes

| Size | 스타일 |
|------|--------|
| `sm` | `px-3 py-1.5 text-sm` |
| `md` (기본) | `px-4 py-2 text-base` |
| `lg` | `px-6 py-3 text-lg` |

## 기본 스타일

- `rounded-lg font-medium`
- `ButtonHTMLAttributes` 전체 확장 (disabled, onClick, type 등)
- 외부 `className` 전달 가능
