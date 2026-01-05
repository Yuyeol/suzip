"use client";

import { useGetProfileStats } from "@/shared/hooks/queries/profile/useGetProfileStats";
import { signOut } from "@/shared/api/auth";
import { useRouter } from "next/navigation";
import Button from "@/shared/components/core/Button";
import { useState } from "react";
import { createClient } from "@/shared/lib/supabase/client";

export default function ProfilePage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  const { data: stats } = useGetProfileStats();

  // Get user email on mount
  useState(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  });

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-border">
        <div className="px-4 py-3">
          <h1 className="text-lg font-semibold">프로필</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-4">
        {/* User Info Section */}
        <div className="mb-8 text-center">
          <p className="text-base text-foreground">{email}</p>
        </div>

        {/* Statistics Section */}
        <div className="mb-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">
                {stats?.total_bookmarks ?? 0}
              </p>
              <p className="text-sm text-muted">총 북마크</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{stats?.folder_count ?? 0}</p>
              <p className="text-sm text-muted">폴더</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {stats?.favorite_count ?? 0}
              </p>
              <p className="text-sm text-muted">즐겨찾기</p>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div>
          <Button
            variant="danger"
            size="lg"
            className="w-full"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
          </Button>
        </div>
      </main>
    </div>
  );
}
