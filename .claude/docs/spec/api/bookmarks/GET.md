# GET /api/bookmarks

북마크 목록 조회 (검색/정렬/필터 지원)

## Query Parameters

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
|---------|------|------|--------|------|
| `search` | string | ✕ | - | 제목, 설명, URL 검색 (ilike) |
| `sort` | string | ✕ | `created_at` | 정렬 필드 |
| `order` | string | ✕ | `desc` | 정렬 순서 (`asc`, `desc`) |
| `folder_id` | string | ✕ | - | 폴더 ID 필터 |
| `is_favorite` | string | ✕ | - | 즐겨찾기 필터 (`"true"`) |

## Request Example

```bash
GET /api/bookmarks?search=react&sort=created_at&order=desc
GET /api/bookmarks?folder_id=xxx&is_favorite=true
```

## Response 200

```json
{
  "data": [
    {
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
  ]
}
```

## 특징

- 검색은 title, description, url 3개 필드에서 동시 검색 (OR 조건)
- 빈 배열 반환 가능 (결과 없을 시)
- user_id로 자동 필터링됨
