# Bottom Navigation (NavBar)

## 레이아웃

```
┌────────────────────────────────────────────┐
│   📑          ⊕           👤              │
│ 저장목록                  프로필            │
└────────────────────────────────────────────┘
```

## 구조

### 저장목록 (왼쪽)
- `BookMarked` 아이콘 (20px) + "저장목록" 텍스트
- 클릭 시 `/` (홈) 이동
- 활성: `text-primary`, 비활성: `text-muted`

### 추가 버튼 (가운데)
- 원형 FAB (Floating Action Button) 스타일
- `w-12 h-12 rounded-full bg-primary text-white`
- `Plus` 아이콘 (24px)
- 클릭 시 `/bookmark/create` 이동
- 텍스트 라벨 없음

### 프로필 (오른쪽)
- `User` 아이콘 (20px) + "프로필" 텍스트
- 클릭 시 `/profile` 이동
- 활성: `text-primary`, 비활성: `text-muted`

## 특징

- `fixed bottom-0` 하단 고정
- `max-w-2xl` 최대 너비 제한, 화면 중앙 정렬
- `bg-background border-t border-border-light`
- `z-50` (최상위 레이어)
- 아래에 `h-16` 스페이서로 컨텐츠 겹침 방지
- 현재 경로(`usePathname`)에 따라 활성 탭 자동 감지
