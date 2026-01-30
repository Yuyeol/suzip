# PATCH /api/folders/[id]

## 개요

폴더명을 수정합니다.

## 요청

### Path Parameters

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| `id` | string (UUID) | 폴더 ID |

### Request Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `name` | string | **필수** | 새 폴더명 |

## 응답

### 200 OK

```json
{
  "data": {
    "id": "uuid",
    "name": "수정된 폴더명",
    "user_id": "uuid",
    "is_favorite": false,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-02T00:00:00.000Z"
  }
}
```

> **참고**: 수정 응답에는 `bookmark_count`가 포함되지 않습니다 (`folderWithoutCountSchema` 사용).

### 400 Bad Request

```json
{ "error": "Missing required fields: name" }
```

### 404 Not Found

```json
{ "error": "Folder not found" }
```

### 409 Conflict

```json
{ "error": "Folder already exists" }
```
