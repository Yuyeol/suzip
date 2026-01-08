# 아키텍처

## 디렉토리 구조

```
src/
├── app/                    # Next.js App Router
│   ├── _components/        # 홈 전용 컴포넌트
│   ├── _hooks/             # 홈 전용 커스텀 훅
│   ├── _utils/             # 홈 전용 유틸리티
│   ├── _api/               # 홈 전용 fetch 함수
│   ├── api/                # API Routes (서버)
│   └── {route}/
│       ├── _components/    # 라우트별 컴포넌트
│       ├── _hooks/         # 라우트별 커스텀 훅
│       ├── _utils/         # 라우트별 유틸리티
│       ├── _api/           # 라우트별 fetch 함수
│       └── _stores/        # 라우트별 Zustand stores (선택)
└── shared/
    ├── components/
    │   ├── core/           # 기본 UI 컴포넌트
    │   ├── layout/         # Header, BottomNav 등
    │   └── provider/       # Provider 컴포넌트
    ├── hooks/              # 전역 커스텀 훅
    ├── stores/             # 전역 Zustand stores (선택)
    ├── utils/              # 전역 유틸리티 함수
    └── api/                # 전역 fetch 함수
```

## 상태 관리

상세한 상태 관리 가이드는 [State Management](state-management.md) 문서를 참고하세요.
