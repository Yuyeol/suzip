import { User } from 'lucide-react';
import DarkModeToggle from '@/app/_components/dark-mode-toggle';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border-light z-50">
      <div className="flex items-center justify-between h-14 px-4">
        {/* 로고 */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-foreground">Savvy</h1>
        </div>

        {/* 오른쪽: 다크모드 토글 + 아바타 */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              // TODO: 마이페이지로 이동
            }}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white"
          >
            <User size={16} />
          </button>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
