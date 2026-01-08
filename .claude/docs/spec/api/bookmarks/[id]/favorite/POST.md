# POST /api/bookmarks/[id]/favorite

즐겨찾기 토글

## Path Parameters

- `id` (string, required) - 북마크 UUID

## Request

Request Body 없음

## Request Example

```bash
POST /api/bookmarks/123e4567-e89b-12d3-a456-426614174000/favorite
```

## Response 200

```json
{
  "data": {
    "id": "uuid",
    "title": "React 공식 문서",
    "url": "https://react.dev",
    "description": "React 배우기",
    "folder_id": "uuid",
    "is_favorite": true,
    "user_id": "uuid",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T12:00:00Z"
  }
}
```

## Error Responses

### 404 Not Found

북마크가 존재하지 않거나 다른 사용자의 북마크:
```json
{
  "error": "Bookmark not found"
}
```

## 동작 방식

1. 현재 북마크의 `is_favorite` 상태 조회
2. 반대 값으로 토글 (`true` ↔ `false`)
3. 업데이트된 북마크 데이터 반환

## 특징

- 현재 상태에 관계없이 토글됨
- 멱등성(idempotent) 보장 안 됨 (호출할 때마다 상태 변경)
- user_id로 자동 필터링
