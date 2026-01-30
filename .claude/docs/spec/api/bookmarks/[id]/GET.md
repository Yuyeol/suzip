# GET /api/bookmarks/[id]

## 개요

단일 북마크의 상세 정보를 조회합니다.

## 요청

### Path Parameters

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| `id` | string (UUID) | 북마크 ID |

## 응답

### 200 OK

```json
{
  "data": {
    "id": "uuid",
    "title": "Example",
    "url": "https://example.com",
    "description": "설명",
    "memo": "메모",
    "thumbnail": "https://example.com/image.png",
    "folder_id": "uuid",
    "is_favorite": false,
    "user_id": "uuid",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### ETag 지원 (Phase 6)

- `data.updated_at` 기반 ETag 생성
- `If-None-Match` 일치 시 `304 Not Modified` 반환

### 404 Not Found

```json
{ "error": "Bookmark not found" }
```
