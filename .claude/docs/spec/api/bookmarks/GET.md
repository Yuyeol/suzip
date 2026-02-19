# GET /api/bookmarks

## 개요

사용자의 북마크 목록을 조회합니다.

## 요청

### Query Parameters

| 파라미터 | 타입 | 기본값 | 설명 |
|----------|------|--------|------|
| `search` | string | `""` | 검색어 (title, description, url에서 검색) |
| `sort` | string | `"created_at"` | 정렬 기준 컬럼 |
| `order` | `"asc"` \| `"desc"` | `"desc"` | 정렬 방향 |
| `folder_id` | string | - | 폴더 ID 필터. `"null"` 문자열이면 미분류(folder_id IS NULL) 북마크 조회 |
| `is_favorite` | `"true"` | - | `"true"`이면 즐겨찾기만 필터링 |
| `page` | number | `1` | 페이지 번호 |
| `limit` | number | `10` | 페이지당 항목 수 |

## 응답

### 200 OK

```json
{
  "data": {
    "items": [
      {
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
    ],
    "total": 42,
    "page": 1,
    "limit": 10
  }
}
```

### ETag 지원 (Phase 6)

- 응답 헤더에 `ETag` 포함 (`generateArrayETag` 기반)
- 요청의 `If-None-Match` 헤더와 일치하면 `304 Not Modified` 반환
- 네트워크 트래픽 감소 효과

## 필터 로직

- `search`: `title.ilike OR description.ilike OR url.ilike`
- `folder_id`:
  - 값이 `"null"` (문자열) → `folder_id IS NULL` (미분류 북마크)
  - 값이 UUID → `folder_id = UUID`
- `is_favorite`: `"true"` → `is_favorite = true`
