# 컴포넌트 작성 규칙

## 위치 규칙

| 위치 | 용도 |
|------|------|
| `app/{route}/page.tsx` | 새 라우트, searchParams 필요 시 |
| `app/{route}/_components/{name}.tsx` | 특정 페이지 전용 |
| `shared/components/{category}/{name}.tsx` | 여러 페이지 재사용, 순수 UI, 도메인 독립적 |

## 작성 규칙

- **Export**: `export default`
- **Props**: `interface Props`
- **File naming**: kebab-case (`user-profile.tsx`)
- **Component naming**: PascalCase (`UserProfile`)
