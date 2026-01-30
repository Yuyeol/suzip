# DELETE /api/folders/[id]

## 개요

폴더를 삭제합니다. 폴더에 속한 북마크는 삭제되지 않고 `folder_id`가 `NULL`로 설정됩니다 (DB 외래키 `ON DELETE SET NULL`).

## 요청

### Path Parameters

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| `id` | string (UUID) | 폴더 ID |

## 응답

### 200 OK

```json
{ "message": "Folder deleted successfully" }
```

### 에러

- Supabase 에러 발생 시 `handleSupabaseError`로 처리

## 동작 상세 (Phase 7)

- 폴더 삭제 시 해당 폴더의 북마크는 `folder_id = NULL`로 자동 변경
- DB 외래키 제약조건(`ON DELETE SET NULL`)에 의해 처리됨
- API 코드에서 별도 북마크 처리 로직 없음
