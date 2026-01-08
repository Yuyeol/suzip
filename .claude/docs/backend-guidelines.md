# Backend 가이드

API Routes 작성 시 따라야 할 규칙

## 📁 구조

```
src/app/api/
├── _utils/              # 공통 유틸리티
│   ├── get-user-id.ts   # 사용자 ID 조회
│   ├── response.ts      # 응답 헬퍼
│   ├── supabase-errors.ts  # Supabase 에러 처리
│   ├── api-handler.ts   # try-catch 래퍼
│   └── validation.ts    # 검증 헬퍼
└── {resource}/
    ├── route.ts         # GET, POST
    └── [id]/route.ts    # GET, PATCH, DELETE
```

## 🎯 기본 패턴

### 1. 핸들러 작성

```typescript
import { NextRequest } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";
import { getUserId } from "@/app/api/_utils/get-user-id";
import { successResponse } from "@/app/api/_utils/response";
import { handleSupabaseError } from "@/app/api/_utils/supabase-errors";
import { withErrorHandler } from "@/app/api/_utils/api-handler";

export const GET = withErrorHandler(async (request: NextRequest) => {
  const supabase = await createClient();
  const userId = getUserId();

  const { data, error } = await supabase
    .from("table_name")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    return handleSupabaseError(error, "Resource");
  }

  return successResponse(data);
});
```

### 2. 필수 필드 검증

```typescript
import { validateRequired } from "@/app/api/_utils/validation";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();

  // 필수 필드 검증
  const validation = validateRequired(body, ["title", "url"]);
  if (validation) return validation;

  // ... 나머지 로직
});
```

### 3. Dynamic Route ([id])

```typescript
interface RouteContext {
  params: Promise<{ id: string }>;
}

export const GET = withErrorHandler(
  async (_request: NextRequest, context?: RouteContext) => {
    const { id } = await context!.params;
    // ... 로직
  }
);
```

## 🛠️ 유틸리티

### 응답 (response.ts)

```typescript
successResponse(data)          // 200 OK
successResponse(data, 201)     // 201 Created
errorResponse("message", 400)  // 400 Bad Request
messageResponse("Success")     // 200 with message
```

### Supabase 에러 (supabase-errors.ts)

```typescript
if (error) {
  return handleSupabaseError(error, "Bookmark");
}
```

자동 처리:
- PGRST116 → 404 Not Found
- 23505 → 409 Conflict (중복)
- 23503 → 400 Bad Request (FK 위반)
- 23502 → 400 Bad Request (필수 필드 누락)
- 42501 → 403 Forbidden (권한 부족)

### 검증 (validation.ts)

```typescript
validateRequired(body, ["field1", "field2"])  // 필수 필드
isValidUrl(url)                                // URL 형식
isValidUuid(id)                                // UUID 형식
```

## ✅ 체크리스트

API 작성 시 확인:

- [ ] `withErrorHandler`로 감쌌는가?
- [ ] Supabase 에러는 `handleSupabaseError`로 처리하는가?
- [ ] 응답은 `successResponse` 등 헬퍼를 사용하는가?
- [ ] 필수 필드는 `validateRequired`로 검증하는가?
- [ ] `user_id` 필터링을 적용했는가?

## 🚫 하지 말 것

```typescript
// ❌ 직접 try-catch 작성
export async function GET() {
  try { ... } catch { ... }
}

// ❌ 직접 NextResponse.json 사용
return NextResponse.json({ error: "..." }, { status: 500 });

// ❌ 수동 에러 처리
if (error.code === "PGRST116") { ... }

// ❌ 수동 필드 검증
if (!body.title || !body.url) { ... }
```

## ✅ 올바른 방법

```typescript
// ✅ withErrorHandler 사용
export const GET = withErrorHandler(async (request) => {
  // ...
});

// ✅ 응답 헬퍼 사용
return successResponse(data);

// ✅ 에러 헬퍼 사용
if (error) return handleSupabaseError(error, "Resource");

// ✅ 검증 헬퍼 사용
const validation = validateRequired(body, ["title", "url"]);
if (validation) return validation;
```
