import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFavorite } from "@/shared/api/bookmarks";
import { bookmarkKeys } from "@/shared/utils/queryKeyFactory";
import type { Bookmark } from "@/shared/api/bookmarks";

export function usePostFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postFavorite(id),
    // 낙관적 업데이트: 서버 요청 전에 즉시 UI 반영
    onMutate: async (id: string) => {
      // 진행 중인 쿼리 취소 (낙관적 업데이트를 덮어쓰지 않도록)
      await queryClient.cancelQueries({ queryKey: bookmarkKeys.all });

      // 이전 데이터 백업
      const previousBookmarks = queryClient.getQueriesData({
        queryKey: bookmarkKeys.all,
      });

      // 모든 북마크 목록 캐시에서 즐겨찾기 상태 즉시 토글
      queryClient.setQueriesData<Bookmark[]>(
        { queryKey: bookmarkKeys.all },
        (old) => {
          if (!old) return old;

          return old.map((bookmark) =>
            bookmark.id === id
              ? { ...bookmark, is_favorite: !bookmark.is_favorite }
              : bookmark
          );
        }
      );

      // 상세 캐시도 업데이트
      queryClient.setQueryData<Bookmark>(bookmarkKeys.detail(id), (old) => {
        if (!old) return old;
        return { ...old, is_favorite: !old.is_favorite };
      });

      // 롤백을 위한 이전 데이터 반환
      return { previousBookmarks };
    },
    // 에러 발생 시 롤백
    onError: (_error, _id, context) => {
      if (context?.previousBookmarks) {
        // 백업한 이전 데이터로 복원
        context.previousBookmarks.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    // 완료 후 서버 데이터로 동기화
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.all,
        refetchType: "active",
      });
    },
  });
}
