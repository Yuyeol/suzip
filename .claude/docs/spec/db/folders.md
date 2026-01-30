# folders 테이블

## 스키마

| 컬럼 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| `id` | UUID | PK, default: gen_random_uuid() | 고유 ID |
| `name` | TEXT | NOT NULL | 폴더명 |
| `user_id` | UUID | NOT NULL, FK → auth.users.id | 소유 사용자 |
| `is_favorite` | BOOLEAN | NOT NULL, default: false | 즐겨찾기 여부 |
| `created_at` | TIMESTAMPTZ | default: now() | 생성 시각 |
| `updated_at` | TIMESTAMPTZ | default: now() | 수정 시각 |

## RLS 정책

- 사용자는 자신의 폴더만 CRUD 가능
- `user_id = auth.uid()` 조건 적용

## 외래키 관계

- `bookmarks.folder_id` → `folders.id` (ON DELETE SET NULL)
- 폴더 삭제 시 소속 북마크의 `folder_id`가 `NULL`로 자동 변경

## Zod 스키마

```typescript
// DB 테이블과 동일 (bookmark_count 없음)
folderWithoutCountSchema: { id, name, user_id, is_favorite, created_at, updated_at }

// API 응답용 (bookmark_count 포함)
folderSchema: folderWithoutCountSchema + { bookmark_count }

// POST/PATCH Request: { name }
```

## 참고

- `bookmark_count`는 DB 컬럼이 아닌 API 레벨에서 계산되는 가상 필드
- 생성/수정 응답에는 `folderWithoutCountSchema` 사용 (bookmark_count 불포함)
- 목록 조회 응답에는 `folderSchema` 사용 (bookmark_count 포함)
