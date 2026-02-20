# og-images 버킷

## 개요

소셜 CDN(Instagram, Twitter 등)의 만료되는 OG 이미지 URL을 영구 보존하기 위한 Supabase Storage 버킷.
북마크 생성/수정 시 외부 썸네일 URL을 다운로드해 압축 저장한다.

## 버킷 설정

| 항목 | 값 |
|------|-----|
| 버킷명 | `og-images` |
| 공개 여부 | Public |
| 최대 파일 크기 | 5MB (업로드 전 체크, 초과 시 저장 안 함) |

## RLS 정책

| 정책명 | 작업 | 조건 |
|--------|------|------|
| Authenticated users can upload | INSERT | `auth.uid() IS NOT NULL` |
| (Public 버킷) | SELECT | 별도 정책 없이 누구나 읽기 가능 |

## 파일 구조

```
og-images/
└── {userId}/
    └── {randomUUID}.webp
```

## 이미지 처리

| 항목 | 값 |
|------|-----|
| 너비 | 200px (비율 유지) |
| 포맷 | webp |
| 품질 | 80 |
| 라이브러리 | sharp 0.34.5 |

## 업로드 로직

**유틸**: `src/shared/lib/supabase/upload-thumbnail.ts`

- 이미 Storage URL(`SUPABASE_URL`로 시작)이면 재업로드 없이 그대로 반환
- 외부 URL이면 fetch → 압축 → 업로드 후 Storage URL 반환
- fetch timeout 10초 — 초과 시 abort 후 `null` 반환
- 실패 시 `null` 반환 (북마크 생성/수정은 계속 진행)

## 사용 시점

| 시점 | 파일 |
|------|------|
| 북마크 생성 | `POST /api/bookmarks` |
| 북마크 수정 (재크롤 시) | `PATCH /api/bookmarks/[id]` |
