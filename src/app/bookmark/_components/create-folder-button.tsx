'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

export default function CreateFolderButton() {
  const router = useRouter();

  const handleCreateFolder = () => {
    router.push('/folder/manage');
  };

  return (
    <button
      type="button"
      onClick={handleCreateFolder}
      className="flex items-center gap-2 text-sm text-primary"
    >
      <Plus size={16} />새 폴더 만들기
    </button>
  );
}
