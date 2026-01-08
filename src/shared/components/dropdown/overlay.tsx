"use client";

interface Props {
  onClose: () => void;
}

export default function Overlay({ onClose }: Props) {
  return <div className="fixed inset-0 z-50" onClick={onClose} />;
}
