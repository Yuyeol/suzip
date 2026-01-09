import FolderInput from "@/app/folder/manage/_components/folder-input";
import FolderList from "@/app/folder/manage/_components/folder-list";

export default function FolderManagePage() {
  return (
    <div>
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">분류 관리</h1>
        <div className="space-y-6">
          <FolderInput />
          <FolderList />
        </div>
      </div>
    </div>
  );
}
