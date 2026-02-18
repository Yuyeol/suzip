# FormInput

React Hook Form `Controller`를 내장한 Input 래퍼 컴포넌트

## Props

```typescript
interface FormInputProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  rules?: RegisterOptions<T>;
  buttonProps?: {
    onClick: () => void;
    label: string;
    disabled?: boolean;
  };
}
```

## 레이아웃

```
기본:
┌──────────────────────────────────────┐
│ 라벨                                 │
│ ┌────────────────────────────────┐   │
│ │ Input                          │   │
│ └────────────────────────────────┘   │
│ 에러 메시지 (있을 때)                │
└──────────────────────────────────────┘

buttonProps 사용 시:
┌──────────────────────────────────────┐
│ 라벨                                 │
│ ┌──────────────────────┐  ┌──────┐  │
│ │ Input                │  │버튼  │  │
│ └──────────────────────┘  └──────┘  │
│ 에러 메시지 (있을 때)                │
└──────────────────────────────────────┘
```

## 기능

- `Controller`로 React Hook Form 통합
- `label` + `Input` + 에러 메시지 자동 렌더링
- `buttonProps` 전달 시 Input 옆에 `Button` 컴포넌트 렌더링
  - 버튼 disabled 시 `primary-light` variant, 활성 시 `primary` variant
- `...inputProps`로 HTML input 속성 확장 (placeholder, maxLength, type 등)

## 사용처

- `BookmarkForm`: 제목 입력
- `UrlInput`: URL 입력 + "확인" 버튼
