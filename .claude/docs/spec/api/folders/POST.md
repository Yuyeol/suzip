# POST /api/folders

## 개요

새 폴더를 생성합니다.

## 요청

### Request Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `name` | string | **필수** | 폴더명 |

## 응답

### 201 Created

```json
{
  "data": {
    "id": "uuid",
    "name": "새 폴더",
    "user_id": "uuid",
    "is_favorite": false,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

> **참고**: 생성 응답에는 `bookmark_count`가 포함되지 않습니다 (`folderWithoutCountSchema` 사용).

### 400 Bad Request

```json
{ "error": "Missing required fields: name" }
```

### 409 Conflict

```json
{ "error": "Folder already exists" }
```
