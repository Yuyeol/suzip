import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFavorite } from "@/shared/api/bookmarks";
import { bookmarkKeys } from "@/shared/utils/queryKeyFactory";

export function usePostFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postFavorite(id),
    onSuccess: (data) => {
      // 해당 북마크의 상세 데이터를 캐시에 즉시 반영
      queryClient.setQueryData(bookmarkKeys.detail(data.id), data);

      // 목록 캐시 무효화 (필터링된 목록들 갱신)
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.all,
        refetchType: "active",
      });
    },
  });
}
