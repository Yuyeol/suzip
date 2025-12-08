'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import ThemeProvider from '@/components/provider/theme-provider';

const DarkModeToggle = dynamic(() => import('@/components/ui/dark-mode-toggle'), {
  ssr: false,
});

interface IProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: IProps) {
  return (
    <ThemeProvider>
      <DarkModeToggle />
      {children}
    </ThemeProvider>
  );
}
