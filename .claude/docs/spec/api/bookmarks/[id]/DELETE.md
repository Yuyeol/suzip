# DELETE /api/bookmarks/[id]

북마크 삭제

## Path Parameters

- `id` (string, required) - 북마크 UUID

## Request Example

```bash
DELETE /api/bookmarks/123e4567-e89b-12d3-a456-426614174000
```

## Response 200

```json
{
  "message": "Bookmark deleted successfully"
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

- user_id로 자동 필터링되어 본인의 북마크만 삭제 가능
- 영구 삭제 (복구 불가)
- 관련된 폴더 관계는 자동으로 해제됨
