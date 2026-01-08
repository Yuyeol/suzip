"use client";

import { useEffect, useRef } from "react";

interface Props {
  triggerRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  onClickOutside?: () => void;
}

export default function DropdownContent({
  triggerRef,
  children,
  onClickOutside,
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClickOutside?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [triggerRef, onClickOutside]);

  return (
    <div
      ref={contentRef}
      className="absolute top-full left-0 bg-background border border-border-light rounded-lg shadow-lg z-50"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}
