"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`relative w-10 h-6 rounded-full transition-colors ${
        theme === "dark" ? "bg-primary" : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
          theme === "dark" ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}
