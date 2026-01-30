# POST /api/folders/[id]/favorite

## 개요

폴더의 즐겨찾기 상태를 토글합니다.

> Phase 9에서 추가된 API입니다.

## 요청

### Path Parameters

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| `id` | string (UUID) | 폴더 ID |

### Request Body

없음 (토글 방식)

## 동작

1. 현재 폴더의 `is_favorite` 조회
2. 반대값으로 업데이트 (`!is_favorite`)

## 응답

### 200 OK

```json
{
  "data": {
    "id": "uuid",
    "name": "폴더명",
    "user_id": "uuid",
    "is_favorite": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### 404 Not Found

```json
{ "error": "Folder not found" }
```
