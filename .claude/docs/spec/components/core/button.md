# Button

## Props

```typescript
variant?: 'primary' | 'primary-light' | 'neutral' | 'danger' | 'danger-light' | 'muted' | 'muted-light'
size?: 'sm' | 'md' | 'lg'
```

## Variants

- **primary**: 기본 액션
- **primary-light**: 기본 액션 (연한 색)
- **neutral**: 중립적 액션
- **danger**: 삭제/경고
- **danger-light**: 삭제/경고 (연한 색)
- **muted**: 비활성화된 느낌
- **muted-light**: 비활성화된 느낌 (연한 색)

## Sizes

- **sm**: 작은 버튼
- **md**: 기본 크기
- **lg**: 큰 버튼

## Usage

```tsx
<Button variant="primary" size="md">저장</Button>
<Button variant="danger">삭제</Button>
```
