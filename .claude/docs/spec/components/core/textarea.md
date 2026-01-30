# Textarea

기본 텍스트 영역 컴포넌트

## Props

```typescript
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
  className?: string;
}
```

## 상태별 스타일

| 상태 | border 스타일 |
|------|---------------|
| 기본 | `border-border-light` |
| 에러 | `border-danger` |

## 기본 스타일

- `w-full px-4 py-2 border rounded-lg`
- `bg-background text-foreground placeholder:text-muted`
- `focus:outline-none resize-none`
- 라벨: `text-base font-medium text-foreground`
- 에러 메시지: `mt-1 text-sm text-danger`

## 특징

- `label` prop 필수
- `error?.message` 있으면 에러 메시지 표시
- `resize-none`으로 리사이즈 비활성화
- `className` prop으로 스타일 확장 가능
