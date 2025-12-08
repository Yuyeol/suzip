'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IThemeStore {
  isDark: boolean;
  toggle: () => void;
}

export const useThemeStore = create<IThemeStore>()(
  persist(
    (set) => ({
      isDark: false,
      toggle: () =>
        set((state) => {
          const next = !state.isDark;
          document.documentElement.classList.toggle('dark', next);
          return { isDark: next };
        }),
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.classList.toggle('dark', state.isDark);
        }
      },
    }
  )
);
