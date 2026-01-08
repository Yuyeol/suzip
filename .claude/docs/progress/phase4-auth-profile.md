# Phase 4: 인증 및 프로필

## 상태: 대기 중

---

## 4.1 Google OAuth 설정

- [ ] Supabase Dashboard에서 Google Provider 활성화
- [ ] Google Cloud Console OAuth 클라이언트 생성 및 연동

---

## 4.2 인증 구현

### 백엔드

- [ ] `get-user-id.ts` 리팩토링 (TEMP_USER_ID 제거, `auth.getUser()` 사용)
- [ ] RLS 정책 업데이트 (`user_id = auth.uid()` - bookmarks, folders)

### 프론트엔드

- [ ] `src/shared/api/auth.ts` 작성 (`signInWithGoogle`, `signOut`, `getUser`)
- [ ] 로그인 페이지 (`/login`) - Google 로그인 버튼
- [ ] 미들웨어 (`middleware.ts`) - 세션 검증, 비로그인 시 `/login` 리다이렉트

---

## 4.3 마이페이지

```
src/app/profile/page.tsx
```

- [ ] 사용자 정보 (프로필 이미지, 이름, 이메일)
- [ ] 통계 (북마크 수, 폴더 수, 즐겨찾기 수)
- [ ] 로그아웃 버튼
- [ ] BottomNav에 프로필 탭 추가

---

## 구현 순서

1. Supabase 설정 → 2. 로그인 페이지 → 3. get-user-id + RLS → 4. 미들웨어 → 5. 마이페이지

---

## 앱 확장 전략

웹 OAuth는 앱 웹뷰에서 차단되므로, 앱 구현 시 Custom Tabs(Android)/SFSafariViewController(iOS)로 브라우저 팝업 방식 사용. 백엔드 코드 변경 불필요.
