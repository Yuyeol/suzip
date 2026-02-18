"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Overlay from "@/shared/components/overlay";
import SelectOption from "@/shared/components/dropdown/select-option";

interface Option<T> {
  value: T;
  label: string;
}

interface Props<T> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
  contentClassName?: string;
  error?: boolean;
  fullWidth?: boolean;
  renderLabel?: (option?: Option<T>) => React.ReactNode;
}

export default function Dropdown<T>({
  options,
  value,
  onChange,
  placeholder = "선택하세요",
  className = "",
  contentClassName = "",
  error = false,
  fullWidth = false,
  renderLabel,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: T) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={fullWidth ? "w-full" : "w-fit"}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 px-3 py-2 border rounded-lg bg-background text-foreground transition-colors ${
          fullWidth ? "w-full" : "w-fit"
        } ${error ? "border-danger" : "border-border-light"} ${className}`}
      >
        <span className="text-sm truncate text-left whitespace-nowrap">
          {renderLabel
            ? renderLabel(selectedOption)
            : selectedOption?.label || placeholder}
        </span>
        <ChevronDown size={14} className="text-muted shrink-0" />
      </button>

      {isOpen && (
        <Overlay onClose={() => setIsOpen(false)}>
          <div className="bg-background border border-border-light rounded-lg shadow-lg py-2 w-full max-h-[300px]">
            <div className={` overflow-y-auto ${contentClassName}`}>
              {options.map((option, idx) => (
                <SelectOption
                  key={
                    typeof option.value === "string"
                      ? option.value
                      : `option-${idx}`
                  }
                  label={option.label}
                  selected={value === option.value}
                  onClick={() => handleSelect(option.value)}
                />
              ))}
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
}
