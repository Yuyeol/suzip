# Phase 5: 기능 고도화

## 상태: 보류

---

## 5.1 OG 메타데이터 자동 추출

### 상태: 보류 (동적 사이트 제약)

### 개요

북마크 URL 입력 시 Open Graph 메타데이터를 자동으로 추출하여 title, description, thumbnail 자동 채우기

### 구현 항목

- [x] open-graph-scraper 라이브러리 설치
- [x] DB 스키마: bookmarks 테이블에 `thumbnail`, `memo` 필드 추가
- [x] API: POST /api/og-metadata (URL → OG 메타데이터 추출)
- [ ] 커스텀 훅: useAutoFillMetadata (URL blur → 자동 채우기)
- [ ] UI: 북마크 생성/수정 페이지에 자동 채우기 적용
- [ ] 썸네일 표시: BookmarkCard에서 이미지 렌더링

### 특징

- URL blur 시 자동 채우기 (사용자 수정 가능)
- 외부 URL만 저장 (Supabase Storage 미사용)
- 에러 시 조용히 실패 (사용자가 수동 입력 가능)
- 폴백: OG → Twitter Card → Dublin Core

### 제약사항 및 보류 이유

**현재 구현 (open-graph-scraper)의 한계:**
- JavaScript로 렌더링되는 동적 사이트에서 OG 메타데이터 추출 불가
- 불가능한 사이트: Threads, Instagram, TikTok, 일부 Twitter/X, 많은 SPA
- 가능한 사이트: GitHub, 뉴스, 블로그, YouTube 등 SSR 사이트

**해결 방법:**
1. Puppeteer/Playwright - Vercel 배포 시 250MB 제한, 타임아웃, 비용 문제
2. 외부 API (Microlink, OpenGraph.io) - 유료, 외부 의존성
3. Meta oEmbed API - 인증 필요, 본인 콘텐츠만 가능

**결정:**
- 동적 사이트 지원을 위한 추가 솔루션 필요성 확인 전까지 보류
- SSR 사이트는 정상 작동하므로 기본 기능은 구현됨
- 필요 시 외부 API 도입 검토

---

## 5.2 향후 개선 사항

### 이미지 캐싱

- Supabase Storage에 이미지 복사
- 외부 URL 깨짐 방지

### 배치 갱신

- 여러 북마크의 메타데이터 일괄 갱신
- 오래된 메타데이터 주기적 업데이트

### 실시간 미리보기

- URL 입력 시 실시간 미리보기 표시
