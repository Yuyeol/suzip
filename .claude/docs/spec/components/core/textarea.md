# Textarea

여러 줄 텍스트 입력을 위한 코어 컴포넌트

## Props

- `label`: 라벨 텍스트
- `error`: FieldError 객체 (react-hook-form)
- `...textareaProps`: 모든 HTML textarea 속성 지원

## 사용 예시

```tsx
<Textarea
  label="설명"
  placeholder="설명을 입력하세요"
  maxLength={500}
  rows={3}
/>
```

## 상태

- **기본**: border-border-light
- **에러**: border-danger + 에러 메시지 표시
- **비활성화**: cursor-not-allowed
