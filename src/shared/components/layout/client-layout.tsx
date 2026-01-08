"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import ThemeProvider from "@/shared/components/provider/theme-provider";
import ReactQueryProvider from "@/shared/components/provider/react-query-provider";
import Header from "@/shared/components/layout/header";
import BottomNav from "@/shared/components/layout/bottom-nav";
import { renderLayoutComponent } from "@/shared/utils/renderLayoutComponent";

interface IProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: IProps) {
  const pathname = usePathname();

  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <div className="relative max-w-2xl mx-auto">
          {renderLayoutComponent(pathname, "header") && <Header />}
          {children}
          {renderLayoutComponent(pathname, "bottomNav") && <BottomNav />}
        </div>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
