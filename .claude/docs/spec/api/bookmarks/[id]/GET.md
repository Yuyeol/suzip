# GET /api/bookmarks/[id]

북마크 단건 조회

## Path Parameters

- `id` (string, required) - 북마크 UUID

## Request Example

```bash
GET /api/bookmarks/123e4567-e89b-12d3-a456-426614174000
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
    "is_favorite": false,
    "user_id": "uuid",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
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

## 특징

- user_id로 자동 필터링되어 본인의 북마크만 조회 가능
- RLS 정책으로 권한 검증
