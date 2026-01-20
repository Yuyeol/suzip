export const STALE_TIME = {
  DEFAULT: Infinity,
  PROFILE: Infinity,
  FOLDERS: Infinity,
  BOOKMARKS: Infinity,
  OG_METADATA: Infinity,
} as const;

export const GC_TIME = Infinity; // 메모리에서 절대 삭제 안함

export const QUERY_CONFIG = {
  ALL: {
    staleTime: STALE_TIME.DEFAULT,
    gcTime: GC_TIME,
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    refetchOnReconnect: true,
  },
  PROFILE: {},
  FOLDERS: {},
  BOOKMARKS: {},
  OG_METADATA: {},
} as const;
