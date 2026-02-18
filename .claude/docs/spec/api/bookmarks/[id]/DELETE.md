# DELETE /api/bookmarks/[id]

## 개요

북마크를 영구 삭제합니다.

## 요청

### Path Parameters

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| `id` | string (UUID) | 북마크 ID |

## 응답

### 200 OK

```json
{ "message": "Bookmark deleted successfully" }
```

### 에러

- Supabase 에러 발생 시 `handleSupabaseError`로 처리
