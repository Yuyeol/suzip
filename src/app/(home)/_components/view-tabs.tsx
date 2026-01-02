'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type ViewType = 'all' | 'folders';

export default function ViewTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentView = (searchParams.get('view') as ViewType) || 'all';

  const handleViewChange = (view: ViewType) => {
    const params = new URLSearchParams(searchParams.toString());

    if (view === 'all') {
      params.delete('view');
    } else {
      params.set('view', view);
    }

    router.push(`/?${params.toString()}`, { scroll: false });
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
