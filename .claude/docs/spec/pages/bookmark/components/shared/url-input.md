# URL Input

## 개요

URL 입력 + OG 메타데이터 추출 기능을 제공하는 컴포넌트

## 레이아웃

```
┌────────────────────────────────────────────┐
│ URL                                        │
│ ┌──────────────────────────────┐  ┌────┐  │
│ │ https://example.com          │  │확인│  │
│ └──────────────────────────────┘  └────┘  │
└────────────────────────────────────────────┘
```

## Props

```typescript
interface Props<T extends FieldValues> {
  control: Control<T>;
  urlFieldName: Path<T>;
  onMetadataFetched: (data: {
    title: string | null;
    description: string | null;
    thumbnail: string | null;
  }) => void;
}
```

## 기능

### URL 입력
- 필수 필드
- placeholder: "https://example.com"
- 검증 규칙: `^https?:\/\/.+` 패턴
- 에러 메시지: "올바른 URL 형식이 아닙니다 (http:// 또는 https://)"

### "확인" 버튼으로 메타데이터 추출
- URL이 유효하고 아직 추출하지 않은 경우에만 버튼 표시
- `usePostOgMetadata` 훅으로 서버 API 호출
- 성공 시: `onMetadataFetched` 콜백으로 title, description, thumbnail 전달
- 성공 후: 버튼 숨김 (`isSuccess` 상태)
- URL 변경 시: 성공 상태 리셋 → 버튼 다시 표시
- 실패 시: 콘솔 에러 로그

### 버튼 상태
- 비활성: `isPending` (추출 중) 또는 URL이 비어있거나 유효하지 않을 때
- 숨김: `isSuccess` (이미 추출 완료)

## 기술적 특징

- 제네릭 타입으로 다양한 폼에서 재사용 가능
- `useWatch`로 URL 필드 실시간 감시
- `useFormState`로 에러 상태 확인
- `FormInput`의 `buttonProps`를 활용한 인라인 버튼
