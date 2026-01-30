---
name: component-creator
description: Create React components following project conventions
---

# Component Creator

## Our Component Location Convention

이 프로젝트는 3가지 컴포넌트 위치를 구분합니다:

### 1. Page Components (`app/{route}/page.tsx`)

Use when:

- 새 라우트 생성
- searchParams 필요

### 2. Page-Specific Components (`app/{route}/_components/{name}.tsx`)

Use when:

- 특정 페이지 전용

### 3. Shared Components (`shared/components/{category}/{name}.tsx`)

Use when:

- 여러 페이지 재사용
- 순수 UI
- 도메인 독립적

## Project-Specific Rules

- **Export**: Always use `export default`
- **Props**: Always use `interface Props`
- **File naming**: kebab-case (`user-profile.tsx`)
- **Component naming**: PascalCase (`UserProfile`)
- **Structure**:

  ```
  app/{route}/
  ├── _components/       # page-specific
  └── page.tsx         # page

  shared/components/
  ├── core/            # pure UI
  └── {category}/      # domain-shared
  ```

## Example Output (Page-Specific Component)

File: `app/voice-test/_components/status-badge.tsx`

```typescript
interface Props {
  status: 'idle' | 'recording' | 'processing';
  label?: string;
}

export default function StatusBadge({ status, label }: Props) {
  const config = {
    idle: { color: 'bg-gray-100', text: '대기' },
    recording: { color: 'bg-red-100', text: '녹음 중' },
    processing: { color: 'bg-blue-100', text: '처리 중' },
  }[status];

  return (
    <div className={`px-4 py-2 ${config.color}`}>
      {label || config.text}
    </div>
  );
}
```
