# Phase 2: Backend 구축

---

## Supabase 클라이언트 설정

### 임시 user_id

```typescript
// src/app/api/_utils/get-user-id.ts
export const TEMP_USER_ID = "00000000-0000-0000-0000-000000000001";
```

**RLS 정책 때문에 필수. Phase 2.4에서 Auth로 전환.**

---

## Folders API (4개)

```
src/app/api/folders/
├── route.ts              # GET, POST
└── [id]/route.ts         # PATCH, DELETE
```

1. GET /api/folders
2. POST /api/folders
3. PATCH /api/folders/[id]
4. DELETE /api/folders/[id] - 북마크 folder_id → null

---

## Bookmarks API (6개)

```
src/app/api/bookmarks/
├── route.ts              # GET, POST
└── [id]/
    ├── route.ts          # GET, PATCH, DELETE
    └── favorite/route.ts # POST
```

1. POST /api/bookmarks
2. GET /api/bookmarks - 검색/정렬/필터
   - `?search=xxx` - title, description, url (ilike)
   - `?sort=created_at&order=desc` (기본값)
   - `?folder_id=xxx&is_favorite=true`
3. GET /api/bookmarks/[id]
4. PATCH /api/bookmarks/[id]
5. DELETE /api/bookmarks/[id]
6. POST /api/bookmarks/[id]/favorite - 토글

---

## 주의사항

### 인증

- 임시 user_id 하드코딩 (`00000000-0000-0000-0000-000000000001`)
- Phase 2.4에서 Supabase Auth로 전환

### 폴더 삭제

- 북마크의 folder_id → null
- 북마크는 삭제 안 함
