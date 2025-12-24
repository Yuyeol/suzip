# 아키텍처

## 디렉토리 구조

```
src/
├── app/                    # Next.js App Router
│   ├── _components/        # 홈 전용 컴포넌트
│   └── {route}/
│       ├── _components/    # 라우트별 컴포넌트
│       └── _stores/        # 라우트별 Zustand stores (선택)
└── shared/
    ├── components/
    │   ├── core/           # 기본 UI 컴포넌트
    │   ├── layout/         # Header, BottomNav 등
    │   └── provider/       # Provider 컴포넌트
    └── stores/             # 전역 Zustand stores (선택)
```

## 상태 관리

상세한 상태 관리 가이드는 [State Management](state-management.md) 문서를 참고하세요.
