# CLAUDE.md

이 문서는 Claude Code가 이 저장소에서 작업할 때 따라야 할 가이드를 제공합니다.

## 프로젝트 개요

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS + CSS Variables
- **루트**: `/src/` (import alias: `@/`)

**Requirements**: Node.js >= 22.0.0, pnpm 10.15.1

## 프로젝트 진행 상황

[.claude/docs/progress/master.md](.claude/docs/progress/master.md)

## Reference

- **[Communication](.claude/docs/communication.md)** - 응답 스타일 및 코드 표현
- **[Code Quality](.claude/docs/code-quality.md)** - 코딩 표준
- **[Architecture](.claude/docs/architecture.md)** - 디렉토리 구조 및 아키텍처
- **[State Management](.claude/docs/state-management.md)** - React Query, useState, Zustand, searchParams
- **[Backend Guidelines](.claude/docs/backend-guidelines.md)** - API Routes 작성 규칙
- **[UI Guidelines](.claude/docs/ui-guidelines.md)** - UI 구현 규칙
- **[Component Guidelines](.claude/docs/component-guidelines.md)** - 컴포넌트 위치 및 작성 규칙
- **[API Layer Guidelines](.claude/docs/api-layer-guidelines.md)** - API 3-Layer 패턴 (Schema → API → Hook)

## Project Specifications

- **[Component Specs](.claude/docs/spec/)** - 컴포넌트별 상세 스펙 문서

## 주요 명령어

- `pnpm dev` - 개발 서버 실행
- `pnpm build` - 프로덕션 빌드
- `pnpm lint` - ESLint 실행
