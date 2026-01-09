import { useQuery } from "@tanstack/react-query";
import { getFolders } from "@/shared/api/folders";
import { folderKeys } from "@/shared/utils/queryKeyFactory";
import { QUERY_CONFIG } from "@/shared/constants/queryConfig";

export function useGetFolders(params: {
  search: string | null;
  sort: string | null;
  order: "asc" | "desc" | null;
  is_favorite: boolean | null;
}) {
  return useQuery({
    queryKey: folderKeys.list(params),
    queryFn: () => getFolders(params),
    ...QUERY_CONFIG.FOLDERS,
  });
}
