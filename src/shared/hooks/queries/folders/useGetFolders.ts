import { useQuery } from "@tanstack/react-query";
import { getFolders } from "@/shared/api/folders";
import { folderKeys } from "@/shared/utils/queryKeyFactory";

export function useGetFolders(params: {
  sort: string | null;
  order: "asc" | "desc" | null;
}) {
  return useQuery({
    queryKey: folderKeys.list(params),
    queryFn: () => getFolders(params),
  });
}
