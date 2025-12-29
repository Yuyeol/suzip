# PATCH /api/folders/[id]

폴더 수정

## Path Parameters

- `id` (string, required) - 폴더 UUID

## Request Body

```json
{
  "name": "새로운 폴더명"
}
```

| 필드 | 타입 | 필수 | 설명 |
|-----|------|------|------|
| `name` | string | ✓ | 폴더 이름 |

## Response 200

```json
{
  "data": {
    "id": "uuid",
    "name": "새로운 폴더명",
    "user_id": "uuid",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T12:00:00Z"
  }
}
```

## Error Responses

### 400 Bad Request

필수 필드 누락:
```json
{
  "error": "Missing required fields: name"
}
```

### 404 Not Found

폴더가 존재하지 않거나 다른 사용자의 폴더:
```json
{
  "error": "Folder not found"
}
```

### 409 Conflict

중복된 폴더 이름:
```json
{
  "error": "Folder already exists"
}
```

## 특징

- `updated_at`은 자동 갱신
- user_id로 자동 필터링되어 본인의 폴더만 수정 가능
- 폴더에 포함된 북마크들은 영향받지 않음
