# Profile Page

## 개요

사용자 정보와 통계를 확인하고, 로그아웃할 수 있는 프로필 페이지

---

## 페이지 구조

```
┌────────────────────────────────────────────┐
│ [Header]                                   │
├────────────────────────────────────────────┤
│                                            │
│ [User Info Section]                        │
│   - Email                                  │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│ [Statistics Section]                       │
│   - 총 북마크 수                           │
│   - 폴더 수                                │
│   - 즐겨찾기 수                            │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│ [Actions Section]                          │
│   - 로그아웃 버튼                          │
│                                            │
└────────────────────────────────────────────┘
│ [Bottom Navigation]                        │
└────────────────────────────────────────────┘
```

---

## 컴포넌트 구성

### 고정 영역

**[Header](../../components/header.md)**
- 상단 고정
- 타이틀: "프로필"

**[Bottom Navigation](../../components/nav-bar.md)**
- 하단 고정
- 프로필 탭 활성화 상태

### User Info Section

**이메일 표시**
- 사용자 이메일 주소 (Google 계정 이메일)
- text-base, text-foreground
- 중앙 정렬

### Statistics Section

**표시 정보**
- 총 북마크 수: 전체 북마크 개수
- 폴더 수: 생성한 폴더 개수
- 즐겨찾기 수: 즐겨찾기로 표시한 북마크 개수

**레이아웃**
- 3-column 그리드 (모바일에서도 3열)
- 각 통계 항목: 중앙 정렬
- 숫자: text-2xl, font-bold
- 라벨: text-sm, text-muted

### Actions Section

**로그아웃 버튼**
- variant: `danger`
- size: `lg`
- 전체 너비 (w-full)
- 클릭 시 로그아웃 처리 후 `/login`으로 리다이렉트

---

## 상태 관리

### Server State
- 사용자 정보 (Supabase Auth)
- 북마크 통계 (React Query)

### Client State
- 로그아웃 로딩 상태

---

## API 요구사항

### GET /api/profile/stats

**Response**
```typescript
{
  data: {
    total_bookmarks: number;
    folder_count: number;
    favorite_count: number;
  }
}
```

**쿼리 로직**
- `total_bookmarks`: bookmarks 테이블에서 user_id로 카운트
- `folder_count`: folders 테이블에서 user_id로 카운트
- `favorite_count`: bookmarks 테이블에서 user_id + is_favorite=true로 카운트

---

## 사용자 플로우

### 기본 플로우
1. 페이지 진입 → 사용자 정보 로드 → 통계 API 호출
2. 통계 데이터 표시 (로딩 중 0 표시)
3. 로그아웃 버튼 클릭 → 로그아웃 → `/login` 리다이렉트

### 에러 처리
- 사용자 정보 로드 실패 → 에러 메시지 표시
- 통계 API 실패 → 기본값(0) 표시

---

## 특징

- 모바일 우선 디자인
- 간단하고 직관적인 UI
- 실시간 통계 표시
- 로그아웃 기능 제공
