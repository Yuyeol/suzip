# DELETE /api/folders/[id]

폴더 삭제

## Path Parameters

- `id` (string, required) - 폴더 UUID

## Request Example

```bash
DELETE /api/folders/123e4567-e89b-12d3-a456-426614174000
```

## Response 200

```json
{
  "message": "Folder deleted successfully"
}
```

## Error Responses

### 404 Not Found

폴더가 존재하지 않거나 다른 사용자의 폴더:
```json
{
  "error": "Folder not found"
}
```

## 동작 방식

1. 폴더 삭제
2. 해당 폴더에 속한 모든 북마크의 `folder_id` → `null`로 변경 (ON DELETE SET NULL)

## 특징

- user_id로 자동 필터링되어 본인의 폴더만 삭제 가능
- 영구 삭제 (복구 불가)
- 폴더 내 북마크는 삭제되지 않고, 폴더 관계만 해제됨
- DB 외래키 제약(`ON DELETE SET NULL`)에 의해 자동 처리
