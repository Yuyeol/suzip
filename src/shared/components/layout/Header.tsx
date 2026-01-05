"use client";

import DarkModeToggle from "@/shared/components/dark-mode-toggle";

export default function Header() {
  return (
    <>
      <header className="max-w-2xl fixed top-0 left-1/2 -translate-x-1/2 bg-background border-b border-border-light z-50 w-full">
        <div className="flex items-center justify-between py-1 px-4">
          {/* 로고 */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-foreground">Savvy</h1>
          </div>

          {/* 오른쪽: 다크모드 토글 + 아바타 */}
          <div className="flex items-center gap-3">
            <DarkModeToggle />
          </div>
        </div>
      </header>
      <div className="h-16" />
    </>
  );
}
