export const STALE_TIME = {
  DEFAULT: Infinity,
  PROFILE: Infinity,
  FOLDERS: Infinity,
  BOOKMARKS: Infinity,
  OG_METADATA: Infinity,
} as const;

export const GC_TIME = Infinity;

export const PERSIST_TIME = Infinity;

export const QUERY_CONFIG = {
  PROFILE: {
    staleTime: STALE_TIME.PROFILE,
    refetchOnWindowFocus: false,
  },
  FOLDERS: {
    staleTime: STALE_TIME.FOLDERS,
    refetchOnWindowFocus: false,
  },
  BOOKMARKS: {
    staleTime: STALE_TIME.BOOKMARKS,
    refetchOnWindowFocus: false,
  },
  OG_METADATA: {
    staleTime: STALE_TIME.OG_METADATA,
    refetchOnWindowFocus: false,
  },
} as const;
