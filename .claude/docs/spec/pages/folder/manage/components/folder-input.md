# Folder Input

## 레이아웃

```
[폴더명 입력...                      ] [추가]
```

## Props

없음 (자체 상태 관리)

## 기능

- 입력 필드: placeholder, maxLength(50)
- 폴더 생성 전용 (수정 기능은 FolderList에서 인라인으로 처리)
- Enter 키로 제출
- 제출 후 입력 필드 자동 초기화

## 내부 구현

- `useState`로 입력 값 관리
- `usePostFolder` hook으로 폴더 생성
- 성공 시 입력 필드 초기화
