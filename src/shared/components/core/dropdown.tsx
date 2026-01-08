"use client";

import { useState, useRef, useEffect } from "react";

export interface DropdownOption {
  label: string;
  value: string;
  variant?: "default" | "danger";
  onClick: () => void;
}

interface Props {
  trigger: React.ReactNode;
  options: DropdownOption[];
  align?: "left" | "right";
}

export default function Dropdown({ trigger, options, align = "right" }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (e: React.MouseEvent, option: DropdownOption) => {
    e.stopPropagation();
    option.onClick();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute top-full mt-1 z-10 min-w-[120px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              onClick={(e) => handleOptionClick(e, option)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                index === 0 ? "rounded-t-lg" : ""
              } ${index === options.length - 1 ? "rounded-b-lg" : ""} ${
                option.variant === "danger"
                  ? "text-rose-600 dark:text-rose-400"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
