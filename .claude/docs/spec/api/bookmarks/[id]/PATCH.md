# PATCH /api/bookmarks/[id]

북마크 수정 (부분 업데이트)

## Path Parameters

- `id` (string, required) - 북마크 UUID

## Request Body

```json
{
  "title": "새로운 제목",
  "is_favorite": true
}
```

모든 필드 선택 사항 (수정할 필드만 전송):

| 필드 | 타입 | 설명 |
|-----|------|------|
| `title` | string | 북마크 제목 |
| `url` | string | 링크 URL |
| `description` | string | 설명/메모 |
| `folder_id` | string | 폴더 ID |
| `is_favorite` | boolean | 즐겨찾기 여부 |

## Response 200

```json
{
  "data": {
    "id": "uuid",
    "title": "새로운 제목",
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

### 400 Bad Request

업데이트할 필드가 없음:
```json
{
  "error": "No fields to update"
}
```

### 404 Not Found

북마크가 존재하지 않거나 다른 사용자의 북마크:
```json
{
  "error": "Bookmark not found"
}
```

## 특징

- 부분 업데이트 지원 (변경할 필드만 전송)
- `updated_at`은 자동 갱신
- user_id로 자동 필터링되어 본인의 북마크만 수정 가능
