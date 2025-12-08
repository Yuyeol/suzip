'use client';

import { ReactNode } from 'react';
import ThemeProvider from '@/shared/components/provider/theme-provider';

interface IProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: IProps) {
  return (
    <ThemeProvider>
      <div className="max-w-2xl mx-auto">
        {children}
      </div>
    </ThemeProvider>
  );
}
