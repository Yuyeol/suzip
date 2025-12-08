# UI Structure

## 폴더 구조 개요

```
src/
├── app/                          # Next.js App Router
│   ├── _components/              # 홈 페이지 전용 컴포넌트
│   ├── page.tsx                  # 홈 페이지
│   └── layout.tsx                # 루트 레이아웃
│
└── shared/                       # 공유 컴포넌트 (앱 외부)
    └── components/
        ├── core/                 # 코어 컴포넌트
        ├── layout/               # 레이아웃 컴포넌트
        └── provider/             # Provider 컴포넌트
```

---

## 구조 원칙

1. **페이지 전용 컴포넌트**: `app/[page]/_components/`
2. **공유 컴포넌트**: `shared/components/`
3. **재사용 시**: 페이지 전용 → 공유로 이동
4. **단독 사용 시**: 공유 → 페이지 전용으로 이동
