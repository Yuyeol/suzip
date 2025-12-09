# 북마크 수정 페이지

## 라우트
`/bookmark/[id]/edit`

## 레이아웃

```
┌────────────────────────────────────────────┐
│ ← 링크 수정                                  │
├────────────────────────────────────────────┤
│                                            │
│ URL                                        │
│ [https://example.com                     ] │
│                                            │
│ 제목                                        │
│ [Next.js 공식 문서                        ] │
│                                            │
│ 설명                                        │
│ [The React Framework...                  ] │
│                                            │
│ 폴더                                        │
│ [📁 개발 자료                         ▼]   │
│                                            │
│ [+ 새 폴더 만들기]                          │
│                                            │
│                         [취소] [수정]       │
└────────────────────────────────────────────┘
```

## 기능

### 데이터 로딩
- URL params에서 id 추출
- API로 북마크 데이터 fetch
- form defaultValues에 설정

### 수정
- URL, 제목, 설명, 폴더 모두 수정 가능
- "수정" 버튼 클릭 시 PUT/PATCH 요청

### Validation
- URL: 필수
- 제목: 필수
- 설명: 선택
- 폴더: 필수

## 차이점 (생성 페이지 대비)

- 제목: "링크 추가" → "링크 수정"
- 버튼: "저장" → "수정"
- defaultValues: 빈 값 → 기존 데이터

## 컴포넌트 재사용

- FormInput ✅ (코어)
- FormTextarea ✅ (코어)
- FolderSelector ✅ (`bookmark/_components/`)
- CreateFolderButton ✅ (`bookmark/_components/`)
- Button ✅
