# FormTextarea

React Hook Form `Controller`를 내장한 Textarea 래퍼 컴포넌트

## Props

```typescript
interface FormTextareaProps<T extends FieldValues>
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  rules?: RegisterOptions<T>;
}
```

## 레이아웃

```
┌──────────────────────────────────────┐
│ 라벨                                 │
│ ┌────────────────────────────────┐   │
│ │ Textarea                       │   │
│ │                                │   │
│ │                                │   │
│ └────────────────────────────────┘   │
│ 에러 메시지 (있을 때)                │
└──────────────────────────────────────┘
```

## 기능

- `Controller`로 React Hook Form 통합
- `label` + `Textarea` + 에러 메시지 자동 렌더링
- `...textareaProps`로 HTML textarea 속성 확장 (rows, maxLength, placeholder 등)

## 사용처

- `BookmarkForm`: 설명/메모 입력 (`rows={3}`, `maxLength={500}`)
