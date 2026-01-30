# Title Input

> **참고**: Phase 8에서 독립 컴포넌트가 아닌 `BookmarkForm` 내부의 `FormInput`으로 통합되었습니다.

## 현재 구현

`BookmarkForm` 내부에서 `FormInput`으로 직접 렌더링:

```tsx
<FormInput
  name="title"
  control={control}
  label="제목"
  placeholder="제목을 입력하세요"
  maxLength={100}
  rules={{ required: "제목을 입력해주세요" }}
/>
```

## 스펙

- **필수** (required)
- 최대 100자
- OG 메타데이터에서 자동 채우기 (값이 있으면 덮어씀)
- label: "제목"
- placeholder: "제목을 입력하세요"
