"use client";

import { useGetProfile } from "@/shared/hooks/queries/profile/useGetProfile";
import {
  SettingsList,
  SettingsItem,
} from "@/app/profile/_components/settings-list";
import ThemeToggle from "@/app/profile/_components/theme-toggle";
import UserInfo from "@/app/profile/_components/user-info";
import Statistics from "@/app/profile/_components/statistics";
import LogoutButton from "@/app/profile/_components/logout-button";

import dynamic from "next/dynamic";

function ProfilePage() {
  const { data: profile } = useGetProfile();

  if (!profile) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 space-y-8">
        {/* User Info Section */}
        <UserInfo email={profile.email} />

        {/* Statistics Section */}
        <Statistics
          totalBookmarks={profile.total_bookmarks}
          folderCount={profile.folder_count}
          favoriteCount={profile.favorite_count}
        />

        {/* Settings Section */}
        <div className="border-t border-border pt-8">
          <SettingsList>
            <SettingsItem label="야간 모드">
              <ThemeToggle />
            </SettingsItem>
          </SettingsList>
        </div>

        {/* Actions Section */}
        <div className="pt-4">
          <LogoutButton />
        </div>
      </main>
    </div>
  );
}

export default dynamic(() => Promise.resolve(ProfilePage), {
  ssr: false,
});
