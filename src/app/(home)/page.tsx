import dynamic from "next/dynamic";
import SearchBar from "@/app/(home)/_components/search-bar";
import ViewTabs from "@/app/(home)/_components/view-tabs";

const FoldersTab = dynamic(
  () => import("@/app/(home)/_components/folders-tab"),
  {
    ssr: false,
  }
);
const BookmarksTab = dynamic(
  () => import("@/app/(home)/_components/bookmarks-tab"),
  { ssr: false }
);
const FilterControls = dynamic(
  () => import("@/app/(home)/_components/filter-controls"),
  { ssr: false }
);

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
