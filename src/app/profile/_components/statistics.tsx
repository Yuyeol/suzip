"use client";

interface StatisticsProps {
  totalBookmarks: number;
  folderCount: number;
  favoriteCount: number;
}

export default function Statistics({
  totalBookmarks,
  folderCount,
  favoriteCount,
}: StatisticsProps) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold">{totalBookmarks}</p>
          <p className="text-sm text-muted">총 북마크</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{folderCount}</p>
          <p className="text-sm text-muted">폴더</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{favoriteCount}</p>
          <p className="text-sm text-muted">즐겨찾기</p>
        </div>
      </div>
    </div>
  );
}
