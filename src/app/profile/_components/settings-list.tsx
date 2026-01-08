"use client";

import { ReactNode } from "react";

interface SettingsListProps {
  children: ReactNode;
}

export function SettingsList({ children }: SettingsListProps) {
  return <div className="divide-y divide-border">{children}</div>;
}

interface SettingsItemProps {
  label: string;
  children: ReactNode;
}

export function SettingsItem({ label, children }: SettingsItemProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </div>
  );
}
