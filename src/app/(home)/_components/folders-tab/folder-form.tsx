import Input from "@/shared/components/core/input";
import Button from "@/shared/components/core/button";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder: string;
  buttonText: string;
  isLoading: boolean;
  onCancel?: () => void;
}

export default function FolderForm({
  value,
  onChange,
  onSubmit,
  placeholder,
  buttonText,
  isLoading,
  onCancel,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 px-4 py-3 border border-border-light rounded-lg bg-background"
    >
      <div className="flex-1">
        <Input
          name="folderName"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={50}
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        disabled={!value.trim() || isLoading}
      >
        {buttonText}
      </Button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 text-sm text-muted"
        >
          취소
        </button>
      )}
    </form>
  );
}
