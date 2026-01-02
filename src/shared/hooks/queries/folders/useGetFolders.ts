import { useQuery } from "@tanstack/react-query";
import { getFolders } from "@/shared/api/folders";
import { folderKeys } from "@/shared/utils/queryKeyFactory";

export function useGetFolders() {
  return useQuery({
    queryKey: folderKeys.lists(),
    queryFn: getFolders,
  });
}
