# Input

기본 텍스트 입력 컴포넌트

## Props

```typescript
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  className?: string;
}
```

## 상태별 스타일

| 상태 | border 스타일 |
|------|---------------|
| 기본 | `border-border-light` |
| 에러 | `border-danger` |
| 비활성 | `border-border-light cursor-not-allowed` |

## 기본 스타일

- `w-full px-4 py-2 border rounded-lg focus:outline-none`
- 라벨: `text-base font-medium text-foreground`
- 에러 메시지: `mt-1 text-sm text-danger`

## 특징

- `forwardRef` 패턴 (외부 ref 전달 가능)
- `label` prop이 있으면 `<label>` 태그로 감싸기
- `error?.message` 있으면 에러 메시지 표시
- `className` prop으로 스타일 확장 가능
