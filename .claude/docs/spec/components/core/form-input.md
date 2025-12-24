# FormInput

React Hook Form Controller를 내장한 폼 전용 Input 컴포넌트

## Props

- `name`: 필드명 (Path<T>)
- `control`: React Hook Form control 객체
- `label`: 라벨 텍스트
- `rules`: 유효성 검사 규칙 (RegisterOptions)
- `...inputProps`: 모든 HTML input 속성 지원

## 사용 예시

```tsx
<FormInput
  name="email"
  control={control}
  label="이메일"
  type="email"
  placeholder="email@example.com"
  rules={{ required: '이메일을 입력해주세요' }}
  required
  maxLength={100}
/>
```
