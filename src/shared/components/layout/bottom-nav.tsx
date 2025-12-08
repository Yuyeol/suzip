import { BookMarked, Plus } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border-light z-50">
      <div className="flex items-center justify-around h-16 px-4">
        {/* 저장목록 */}
        <button
          onClick={() => {
            // TODO: 저장목록으로 이동
          }}
          className="flex flex-col items-center gap-1"
        >
          <BookMarked size={20} className="text-muted" />
          <span className="text-xs text-muted">저장목록</span>
        </button>

        {/* 추가 버튼 */}
        <button
          onClick={() => {
            // TODO: /items/new 페이지로 이동
          }}
          className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white"
        >
          <Plus size={24} />
        </button>
      </div>
    </nav>
  );
}
