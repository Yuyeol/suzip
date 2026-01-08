"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/shared/api/auth";
import Button from "@/shared/components/core/button";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
    <Button
      variant="danger"
      size="lg"
      className="w-full"
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
    </Button>
  );
}
