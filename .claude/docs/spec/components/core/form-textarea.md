# FormTextarea

React Hook Form Controller를 내장한 폼 전용 Textarea 컴포넌트

## Props

- `name`: 필드명 (Path<T>)
- `control`: React Hook Form control 객체
- `label`: 라벨 텍스트
- `rules`: 유효성 검사 규칙 (RegisterOptions)
- `rows`: 행 수 (기본값: 3)
- `...textareaProps`: 모든 HTML textarea 속성 지원

## 사용 예시

```tsx
<FormTextarea
  name="description"
  control={control}
  label="설명"
  placeholder="설명을 입력하세요"
  maxLength={500}
  rows={3}
/>
```
