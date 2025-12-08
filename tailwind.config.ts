import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white: "var(--color-default-white)",
        black: "var(--color-default-black)",
        primary: {
          DEFAULT: '#3b82f6', // blue-500
          light: '#93c5fd',   // blue-300
        },
        danger: {
          DEFAULT: '#f43f5e', // rose-500
          light: '#fda4af',   // rose-300
        },
        muted: {
          DEFAULT: '#6b7280', // gray-500
          light: '#d1d5db',   // gray-300
        },
        border: {
          DEFAULT: '#6b7280', // gray-500
          light: '#d1d5db',   // gray-300
        },
      },
    },
  },
  plugins: [],
};
export default config;
