import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchBookmark } from "@/shared/api/bookmarks";
import { bookmarkKeys, folderKeys } from "@/shared/utils/queryKeyFactory";
import type { BookmarkPatchRequest } from "@/shared/api/bookmarks";

export function usePatchBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: string;
      request: BookmarkPatchRequest;
    }) => patchBookmark(id, request),
    onSuccess: (data) => {
      // 상세 데이터 캐시 즉시 업데이트
      queryClient.setQueryData(bookmarkKeys.detail(data.id), data);

      // 관련 목록 및 폴더 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.all,
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: folderKeys.all,
        refetchType: "active",
      });
    },
  });
}
