# Description Input

> **참고**: Phase 8에서 독립 컴포넌트가 아닌 `BookmarkForm` 내부의 `FormTextarea`로 통합되었습니다.

## 현재 구현

`BookmarkForm` 내부에서 `FormTextarea`로 직접 렌더링:

```tsx
<FormTextarea
  name="description"
  control={control}
  label="설명"
  placeholder="설명을 입력하세요"
  maxLength={500}
  rows={3}
/>
```

## 스펙

- 선택 (optional)
- 최대 500자
- 3줄 높이
- OG 메타데이터에서 자동 채우기 (값이 있으면 덮어씀)
- label: "설명"
- placeholder: "설명을 입력하세요"
