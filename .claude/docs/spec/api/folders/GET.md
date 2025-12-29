# GET /api/folders

폴더 목록 조회

## Query Parameters

없음

## Request Example

```bash
GET /api/folders
```

## Response 200

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "개발",
      "user_id": "uuid",
      "created_at": "2025-01-01T00:00:00Z",
      "updated_at": "2025-01-01T00:00:00Z"
    },
    {
      "id": "uuid",
      "name": "디자인",
      "user_id": "uuid",
      "created_at": "2025-01-02T00:00:00Z",
      "updated_at": "2025-01-02T00:00:00Z"
    }
  ]
}
```

## 특징

- user_id로 자동 필터링됨
- 생성 시간 기준 내림차순 정렬
- 빈 배열 반환 가능 (폴더 없을 시)
