# GET /api/folders

## 개요

사용자의 폴더 목록을 조회합니다. 각 폴더의 북마크 개수도 함께 반환합니다.

## 요청

### Query Parameters

| 파라미터 | 타입 | 기본값 | 설명 |
|----------|------|--------|------|
| `search` | string | `""` | 폴더명 검색 (`name ILIKE`) |
| `sort` | string | `"created_at"` | 정렬 기준 컬럼 |
| `order` | `"asc"` \| `"desc"` | `"desc"` | 정렬 방향 |
| `is_favorite` | `"true"` | - | `"true"`이면 즐겨찾기 폴더만 필터링 |

## 응답

### 200 OK

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "개발",
      "user_id": "uuid",
      "is_favorite": false,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z",
      "bookmark_count": 5
    }
  ]
}
```

### ETag 지원 (Phase 6)

- `generateArrayETag(folders)` + `totalBookmarkCount` 조합으로 ETag 생성
- 폴더 데이터뿐 아니라 북마크 개수 변경도 감지
- `If-None-Match` 일치 시 `304 Not Modified` 반환

## 구현 상세

- 폴더 목록 조회 후, 각 폴더별 `bookmarks` 테이블에서 `count` 쿼리 실행
- `Promise.all`로 병렬 처리
- 응답 필드: DB 필드 + `bookmark_count` (계산된 가상 필드)
