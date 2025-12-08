# Component Organization

## Directory Structure

- **Shared components**: `/shared/components/` (reusable across the app)
- **Page-specific components**: `/app/{route}/_component/` (colocated with routes)

## Naming

- **File**: kebab-case (`link-card.tsx`, `button.tsx`)
- **Component**: PascalCase (`LinkCard`, `Button`)

## Component Conventions

### Export Pattern

Always use `export default`:

```typescript
export default function ComponentName({ ... }: IProps) {
  // ...
}
```

### Props Interface

Always name props interface as `IProps`:

```typescript
interface IProps {
  searchParams: { year: string; model: string };
}

export default function Page({ searchParams }: IProps) {
  // ...
}
```

## Principles

1. **Co-location** - Keep page-specific components in `/app/{route}/_component/`
2. **Shared primitives** - Reusable UI in `/shared/components/`
