interface Props {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function SelectOption({ label, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left py-2 px-4 text-sm ${
        selected ? "text-primary font-medium" : "text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
