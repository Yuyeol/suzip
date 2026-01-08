# Dropdown

## Props

```typescript
trigger: React.ReactNode
options: DropdownOption[]
align?: 'left' | 'right'
```

## DropdownOption

```typescript
{
  label: string
  value: string
  variant?: 'default' | 'danger'
  onClick: () => void
}
```

## Variants

- **default**: 기본 옵션
- **danger**: 삭제 등 위험한 액션

## Usage

```tsx
<Dropdown
  trigger={<button><MoreVertical /></button>}
  options={[
    { label: '수정', value: 'edit', onClick: () => {} },
    { label: '삭제', value: 'delete', variant: 'danger', onClick: () => {} },
  ]}
/>
```
