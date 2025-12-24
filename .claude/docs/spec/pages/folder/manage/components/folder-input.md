# Folder Input

## 레이아웃

**생성 모드**
```
[폴더명 입력...                      ] [추가]
```

**수정 모드**
```
[개발 자료                           ] [수정 완료]
```

## Props

- `value`: 입력 값
- `onChange`: 입력 변경 핸들러
- `onSubmit`: 제출 핸들러
- `mode`: 'create' | 'edit'

## 기능

- 입력 필드: placeholder, maxLength
- 버튼: mode에 따라 "추가" | "수정 완료"
- Enter 키로 제출

## 특징

- React Hook Form 사용
- 제출 후 입력 필드 초기화 (생성 모드)
