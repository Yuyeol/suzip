# POST /api/bookmarks

북마크 생성

## Request Body

```json
{
  "title": "React 공식 문서",
  "url": "https://react.dev",
  "description": "React 배우기",
  "folder_id": "uuid",
  "is_favorite": false
}
```

| 필드 | 타입 | 필수 | 기본값 | 설명 |
|-----|------|------|--------|------|
| `title` | string | ✓ | - | 북마크 제목 |
| `url` | string | ✓ | - | 링크 URL |
| `description` | string | ✕ | null | 설명/메모 |
| `folder_id` | string | ✕ | null | 폴더 ID |
| `is_favorite` | boolean | ✕ | false | 즐겨찾기 여부 |

## Response 201

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

### 400 Bad Request

필수 필드 누락:
```json
{
  "error": "Missing required fields: title, url"
}
```

### 409 Conflict

중복 데이터 (Unique 제약이 있는 경우):
```json
{
  "error": "Bookmark already exists"
}
```

## 특징

- `user_id`는 자동으로 현재 사용자 ID로 설정
- `created_at`, `updated_at`은 자동 생성
