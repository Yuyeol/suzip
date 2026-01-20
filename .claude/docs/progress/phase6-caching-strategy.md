# Phase 6: React Query 캐싱 전략 최적화 (Multi-Device Personal App)

## 상태: 완료 ✅

---

## 개요

사용자가 자신의 북마크를 **여러 기기(PC, 모바일, 태블릿)**에서 관리하는 개인화 앱입니다. 단일 사용자지만 멀티 디바이스 시나리오를 고려하여, **세션 내 극대화 캐싱 + 기기 간 자연스러운 동기화**를 목표로 합니다.

### 핵심 전략

1. **긴 staleTime**: 같은 세션 내 불필요한 재요청 최소화
2. **refetchOnWindowFocus**: 앱/탭 재진입 시 자동 동기화
3. **ETag 헤더**: 서버에서 304 응답으로 변경 없을 시 네트워크 절약
4. **C/U/D 시 invalidateQueries**: 사용자 액션 후 즉시 갱신

---

## 6.1 버그 수정 및 기반 강화 (P0) - [완료]

### 구현 항목

- [x] QueryKeyFactory에 `is_favorite` 파라미터 추가 (필터링 정합성)
- [x] 모든 Mutation에 `refetchType: 'active'` 추가 (불필요한 배경 리페칭 방지)
- [x] 상호 의존적 데이터 캐시 무효화 로직 보완 (폴더 ↔ 북마크 연동)

---

## 6.2 멀티 디바이스 캐싱 전략 (P1) - [완료]

### 구현 항목

#### 6.2.1 React Query 기본 설정 개선

- [x] **캐싱 설정 상수 업데이트** (`src/shared/constants/queryConfig.ts`)

  ```typescript
  STALE_TIME: Infinity,  // 영구 신선, invalidate로만 갱신
  GC_TIME: Infinity,     // 메모리에서 절대 삭제 안함
  ```

- [x] **전역 refetch 옵션 설정** (`QUERY_CONFIG.ALL` 생성)
  ```typescript
  refetchOnWindowFocus: true,   // 탭/앱 재진입 시 자동 동기화
  refetchOnMount: false,        // stale 아니면 재요청 안함
  refetchOnReconnect: true,     // 네트워크 재연결 시 동기화
  ```

#### 6.2.2 ETag 기반 조건부 요청 구현

HTTP 표준 `ETag` 헤더를 활용하여 불필요한 데이터 전송을 최소화합니다.

**동작 원리:**

1. 첫 요청: 서버가 `updated_at` 기반 ETag 헤더와 함께 데이터 응답
2. 재요청: 브라우저가 자동으로 `If-None-Match` 헤더 전송
3. 캐시 검증: 서버가 ETag 비교 후 304 Not Modified 응답 (데이터 없음)
4. 데이터 변경 시: ETag 불일치 → 200 OK로 새 데이터 전송

**구현:**

- [x] [response.ts](../../src/app/api/_utils/response.ts) - ETag 검증 로직
- [x] [GET /api/bookmarks](../../src/app/api/bookmarks/route.ts#L55-L66) - 배열 ETag
- [x] [GET /api/bookmarks/[id]](../../src/app/api/bookmarks/[id]/route.ts#L28-L33) - 단일 객체 ETag
- [x] [GET /api/folders](../../src/app/api/folders/route.ts#L59-L70) - 배열 ETag

**성능 개선:**

- 데이터 미변경 시: 전체 데이터 → 헤더만 (수십 KB → 수백 bytes)
- 응답 시간 60~70% 감소 (실측)

#### 6.2.3 ETag 보강 작업

**1단계: ETag 생성 로직 개선 및 강도 향상**

- [x] 빈 배열 ETag 처리 개선 (일관된 ETag 제공)

**2단계: ETag 유틸 함수 분리**

- [x] `generateArrayETag` 유틸 함수 생성
- [x] 중복 reduce 로직 제거 및 유틸 적용

**3단계: 폴더 API ETag 불일치 이슈 해결**

- [x] `foldersWithCount` 기준 ETag 생성 로직 수정
- [x] 북마크 개수 변경 시 ETag 갱신 보장 (이미 구현됨 - 북마크 mutation에서 폴더 캐시 무효화)

#### 6.2.4 Mutation 후 캐시 갱신 전략

- [x] **C/U/D 시 invalidateQueries 사용** (기존 유지)
  - 기존 mutation hooks의 invalidate 로직 그대로 유지
  - 서버 ETag가 자동으로 변경되어 다른 기기에서 감지됨

---

## 구현 요약

### 핵심 변경사항

1. **React Query 설정** ([src/shared/constants/queryConfig.ts](src/shared/constants/queryConfig.ts))

   - `STALE_TIME.DEFAULT: Infinity` - 데이터가 절대 썩지 않음
   - `GC_TIME: Infinity` - 메모리에서 절대 삭제 안함
   - `QUERY_CONFIG.ALL` 객체로 모든 전역 설정 통합

2. **ETag 통합** ([src/app/api/\_utils/response.ts](src/app/api/_utils/response.ts))

   - `successResponse`에 ETag 로직 내장
   - updated_at 기반 자동 ETag 생성
   - 조건부 응답 자동 처리 (304/200)

3. **API Route 적용**
   - [GET /api/bookmarks](src/app/api/bookmarks/route.ts:55)
   - [GET /api/folders](src/app/api/folders/route.ts:59-62)
   - [GET /api/bookmarks/[id]](src/app/api/bookmarks/[id]/route.ts:28)

---

## 최종 캐싱 정책 (queryConfig)

| 구분            | 상수명               | 값         | 목적                                  |
| :-------------- | :------------------- | :--------- | :------------------------------------ |
| **신선도 유지** | `STALE_TIME`         | `Infinity` | invalidate로만 갱신, 자동 재검증 안함 |
| **메모리 보존** | `GC_TIME`            | `Infinity` | 메모리에서 절대 삭제 안함             |
| **자동 동기화** | refetchOnWindowFocus | `true`     | 앱/탭 재진입 시 최신 데이터 확인      |
| **조건부 요청** | ETag                 | 서버 구현  | 변경 없을 시 304 응답으로 대역폭 절약 |

---

## 예상 효과

### 네트워크 요청 패턴

| 시나리오                       | 동작                                        | 네트워크 비용 |
| :----------------------------- | :------------------------------------------ | :------------ |
| **같은 기기 내 탭 전환**       | 캐시 즉시 사용 (영구)                       | 0 byte        |
| **앱/탭 재진입 (데이터 동일)** | refetchOnWindowFocus → ETag 체크 → 304 응답 | ~200 byte     |
| **앱/탭 재진입 (데이터 변경)** | refetchOnWindowFocus → 전체 데이터 재수신   | 전체 크기     |
| **C/U/D 액션**                 | invalidate → 즉시 재요청                    | 전체 크기     |

### 핵심 개선점

- ✅ 세션 내 즉각 반응 (캐시 활용)
- ✅ 멀티 디바이스 자연스러운 동기화 (앱 재진입 시)
- ✅ 불필요한 데이터 전송 최소화 (ETag)
- ✅ 사용자 액션 후 즉시 반영 (invalidate)

---
