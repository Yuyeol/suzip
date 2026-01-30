# bookmarks 테이블

## 스키마

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| `id` | UUID | PK, default: gen_random_uuid() | 고유 ID |
| `title` | TEXT | NOT NULL | 북마크 제목 |
| `url` | TEXT | NOT NULL | 북마크 URL |
| `description` | TEXT | NULLABLE | 설명 (OG 메타데이터 또는 사용자 입력) |
| `memo` | TEXT | NULLABLE | 사용자 메모 |
| `thumbnail` | TEXT | NULLABLE | 썸네일 URL (OG 메타데이터) |
| `folder_id` | UUID | FK → folders.id, ON DELETE SET NULL, NULLABLE | 소속 폴더 |
| `is_favorite` | BOOLEAN | NOT NULL, default: false | 즐겨찾기 여부 |
| `user_id` | UUID | NOT NULL, FK → auth.users.id | 소유 사용자 |
| `created_at` | TIMESTAMPTZ | default: now() | 생성 시각 |
| `updated_at` | TIMESTAMPTZ | default: now() | 수정 시각 |

## RLS 정책

- 사용자는 자신의 북마크만 CRUD 가능
- `user_id = auth.uid()` 조건 적용

## Zod 스키마

```typescript
// Entity
bookmarkSchema: { id, title, url, description, folder_id, is_favorite, thumbnail, memo, user_id, created_at, updated_at }

// POST Request: title(필수), url(필수), description, folder_id, is_favorite, thumbnail, memo
// PATCH Request: title, url, description, folder_id(nullable), is_favorite, memo
```

## 인덱스

- `user_id` (RLS 필터링 최적화)
- `folder_id` (폴더별 조회 최적화)
