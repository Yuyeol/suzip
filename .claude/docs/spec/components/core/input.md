# Input

## Props

```typescript
label?: string
error?: FieldError
disabled?: boolean
```

## 상태

### 기본 상태
- 회색 테두리 (`border-border-light`)
- 흰색 배경

### 에러 상태
- 빨간 테두리 (`border-danger`)
- 하단에 빨간색 에러 메시지 표시

### Disabled 상태
- 회색 배경 (`bg-muted-light`)
- 회색 텍스트 (`text-muted`)
- 커서 변경 (`cursor-not-allowed`)

## Usage

```tsx
<Input label="이메일" placeholder="email@example.com" />
<Input label="이메일" error={errors.email} />
<Input label="비활성" disabled />
```
