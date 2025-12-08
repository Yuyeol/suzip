# Savvy - 북마크 관리 서비스 기획서

## 프로젝트 개요

링크를 저장하고 폴더로 정리할 수 있는 북마크 관리 서비스

---

## 핵심 기능

### 1. 링크 관리
- 링크 추가 (제목, URL, 설명)
- 링크 상세 보기
- 링크 수정/삭제
- 검색 (제목 기준)
- 정렬 (최신순/이름순)

### 2. 폴더 시스템
- 폴더 생성/수정/삭제 (1단계만)
- 폴더별 필터링
- 향후 태그 시스템으로 확장

### 3. 인증
- Supabase Auth 사용
- 로그인/회원가입
- 사용자별 데이터 분리

---

## 기술 스택

### Frontend
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- React Hook Form

### Backend
- Supabase PostgreSQL
- Next.js API Routes

### 배포
- Vercel

---

## 데이터베이스 구조

### items 테이블
```
id: UUID
type: 'link' (향후 'image' 확장 가능)
title: VARCHAR(500)
url: TEXT
description: TEXT
folder_id: UUID (nullable)
user_id: UUID
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### folders 테이블
```
id: UUID
name: VARCHAR(255)
user_id: UUID
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

---

## 페이지 구조

### `/` - 메인 페이지
- 링크 목록 (그리드)
- 검색바 + 정렬
- 폴더 네비게이션
- 추가 버튼

### `/items/new` - 링크 추가
- 제목, URL, 설명 입력
- 폴더 선택

### `/items/[id]` - 링크 상세
- 링크 정보 표시
- 수정/삭제 버튼

---

## UI 디자인 시스템

**색상 정의는 `src/app/globals.css` 참조**

### 컴포넌트
- Button (7 variants, 3 sizes)
- Input (forwardRef, react-hook-form 호환)
- Card (clickable 옵션)

---

## 향후 확장 계획

1. 이미지 북마크 추가
2. 태그 시스템
3. 공유 기능
4. 북마크 import/export
5. 브라우저 확장 프로그램

---

## 개발 현황

### 완료
- [x] 프로젝트 초기 설정
- [x] UI 컴포넌트 시스템 구축
- [x] 색상 디자인 시스템 정립
- [x] React Hook Form 통합

### 진행 예정
- [ ] Supabase 설정
- [ ] 데이터베이스 마이그레이션
- [ ] API Routes 구현
- [ ] 메인 페이지 구현
- [ ] 인증 시스템 구현
