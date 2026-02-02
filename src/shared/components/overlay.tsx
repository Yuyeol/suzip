"use client";

import Portal from "@/shared/components/portal";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export default function Overlay({ children, onClose, className = "" }: Props) {
  return (
    <Portal>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black/80 px-6 ${className}`}
        onClick={onClose}
      >
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    </Portal>
  );
}
