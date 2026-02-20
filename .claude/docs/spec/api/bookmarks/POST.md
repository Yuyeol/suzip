# POST /api/bookmarks

## 개요

새 북마크를 생성합니다.

## 요청

### Request Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `title` | string | **필수** | 북마크 제목 |
| `url` | string | **필수** | 북마크 URL |
| `description` | string | 선택 | 설명 |
| `folder_id` | string | 선택 | 폴더 ID |
| `is_favorite` | boolean | 선택 | 즐겨찾기 (기본: false) |
| `thumbnail` | string | 선택 | 썸네일 외부 URL (OG 메타데이터) — Supabase Storage에 200px webp로 변환 저장됨 |
| `memo` | string | 선택 | 사용자 메모 |

## 응답

### 201 Created

```json
{
  "data": {
    "id": "uuid",
    "title": "Example",
    "url": "https://example.com",
    "description": null,
    "memo": null,
    "thumbnail": null,
    "folder_id": null,
    "is_favorite": false,
    "user_id": "uuid",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### 400 Bad Request

```json
{ "error": "Missing required fields: title, url" }
```

### 409 Conflict

```json
{ "error": "Bookmark already exists" }
```
