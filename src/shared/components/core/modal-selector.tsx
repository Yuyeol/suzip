"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Option<T extends string> {
  value: T;
  label: string;
}

interface Props<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  modalTitle?: string;
}

export default function ModalSelector<T extends string>({
  options,
  value,
  onChange,
  placeholder = "선택하세요",
  modalTitle = "옵션 선택",
}: Props<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: T) => {
    onChange(optionValue);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-1 px-3 py-2 border border-border-light rounded-lg bg-background text-foreground whitespace-nowrap"
      >
        <span className="text-sm">{selectedOption?.label || placeholder}</span>
        <ChevronDown size={14} className="text-muted" />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-background rounded-lg p-6 w-80 max-w-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {modalTitle}
            </h3>
            <div className="space-y-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="flex items-center gap-3 w-full text-left py-2"
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      value === option.value
                        ? "border-primary bg-primary"
                        : "border-border-light"
                    }`}
                  >
                    {value === option.value && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </span>
                  <span className="text-sm text-foreground">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-6 py-2 bg-muted-light text-foreground rounded-lg"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
