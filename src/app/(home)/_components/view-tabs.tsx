'use client';

type ViewType = 'all' | 'folders';

type ViewTabsProps = {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
};

export default function ViewTabs({ currentView, onViewChange }: ViewTabsProps) {
  const handleViewChange = (view: ViewType) => {
    onViewChange(view);
    // TODO: URL state 업데이트 (?view=all / ?view=folders)
  };

  return (
    <div className="w-full px-4 py-3 border-b border-border-light">
      <div className="flex gap-6">
        <button
          onClick={() => handleViewChange('all')}
          className={`pb-2 px-1 text-sm font-medium transition-colors border-b-2 ${
            currentView === 'all'
              ? 'text-primary border-primary'
              : 'text-muted border-transparent'
          }`}
        >
          전체보기
        </button>
        <button
          onClick={() => handleViewChange('folders')}
          className={`pb-2 px-1 text-sm font-medium transition-colors border-b-2 ${
            currentView === 'folders'
              ? 'text-primary border-primary'
              : 'text-muted border-transparent'
          }`}
        >
          폴더보기
        </button>
      </div>
    </div>
  );
}
