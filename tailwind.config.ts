import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sb)"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      keyframes: {
        fadeOut: {
          "0%": { opacity: "1" },
          "25%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        fadeOut: "fadeOut 1500ms ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
