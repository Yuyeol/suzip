# ActionMenu

## Props

```typescript
interface ActionMenuOption {
  label: string;
  value: string;
  variant?: "default" | "danger";
  disabled?: boolean;
  onClick: () => void;
}

interface Props {
  trigger: React.ReactNode;
  options: ActionMenuOption[];
  align?: "left" | "right"; // 기본: "right"
}
```

## 기능

- `trigger` 클릭 시 액션 메뉴 열기/닫기
- 외부 클릭 시 자동 닫힘 (`useRef` + `mousedown` 이벤트)
- 옵션 클릭 시 `onClick` 실행 + 메뉴 닫힘
- `disabled` 옵션은 `opacity-50 cursor-not-allowed`
- 이벤트 전파 중지 (`stopPropagation`)

## 옵션 스타일

| Variant   | 스타일                             |
| --------- | ---------------------------------- |
| `default` | `text-gray-700 dark:text-gray-200` |
| `danger`  | `text-rose-600 dark:text-rose-400` |

## 특징

- `absolute` 포지셔닝 (trigger 바로 아래)
- `min-w-[120px]`, `rounded-lg`, `shadow-lg`
- 다크모드 지원: `dark:border-gray-700`, `dark:bg-gray-800`
- 첫 번째/마지막 옵션에 `rounded-t-lg`/`rounded-b-lg` 적용
