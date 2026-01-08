# POST /api/folders

폴더 생성

## Request Body

```json
{
  "name": "개발"
}
```

| 필드 | 타입 | 필수 | 설명 |
|-----|------|------|------|
| `name` | string | ✓ | 폴더 이름 |

## Response 201

```json
{
  "data": {
    "id": "uuid",
    "name": "개발",
    "user_id": "uuid",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
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

### 409 Conflict

중복된 폴더 이름 (같은 사용자의 동일 이름 폴더가 있는 경우):
```json
{
  "error": "Folder already exists"
}
```

## 특징

- `user_id`는 자동으로 현재 사용자 ID로 설정
- `created_at`, `updated_at`은 자동 생성
- 폴더 이름은 중복 가능 (별도 Unique 제약이 없다면)
