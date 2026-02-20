# PATCH /api/bookmarks/[id]

## 개요

북마크를 부분 수정합니다.

## 요청

### Path Parameters

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| `id` | string (UUID) | 북마크 ID |

### Request Body (모두 선택)

| 필드 | 타입 | 설명 |
|------|------|------|
| `title` | string | 제목 |
| `url` | string | URL |
| `description` | string | 설명 |
| `folder_id` | string \| null | 폴더 ID (null이면 미분류) |
| `is_favorite` | boolean | 즐겨찾기 |
| `thumbnail` | string \| null | 썸네일 외부 URL — Supabase Storage에 200px webp로 변환 저장됨 |
| `memo` | string | 메모 |

## 응답

### 200 OK

```json
{
  "data": {
    "id": "uuid",
    "title": "Updated Title",
    "url": "https://example.com",
    "description": "Updated description",
    "memo": "Updated memo",
    "thumbnail": "https://example.com/image.png",
    "folder_id": "uuid",
    "is_favorite": true,
    "user_id": "uuid",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-02T00:00:00.000Z"
  }
}
```

### 400 Bad Request

```json
{ "error": "No fields to update" }
```

### 404 Not Found

```json
{ "error": "Bookmark not found" }
```
