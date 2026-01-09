import SearchBar from "@/app/(home)/_components/search-bar";
import ViewTabs from "@/app/(home)/_components/view-tabs";
import FoldersTab from "@/app/(home)/_components/folders-tab";
import BookmarksTab from "@/app/(home)/_components/bookmarks-tab";
import FilterControls from "@/app/(home)/_components/filter-controls";

interface HomeProps {
  searchParams: { view?: string };
}

export default function Home({ searchParams }: HomeProps) {
  const { view = "all" } = searchParams;

  return (
    <div className="pb-20">
      <SearchBar />
      <ViewTabs />
      <div className="px-4 py-4">
        <FilterControls />
        {view === "all" ? <BookmarksTab /> : <FoldersTab />}
      </div>
    </div>
  );
}
