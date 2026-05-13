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
        synthwave: {
          bg: "#0a0014",
          cyan: "#00ffff",
          pink: "#ff2d78",
          purple: "#9333ea",
          magenta: "#ff00ff",
          darkcard: "rgba(15, 0, 30, 0.85)",
        },
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
      },
      boxShadow: {
        neon_cyan: "0 0 8px #00ffff, 0 0 20px #00ffff40",
        neon_pink: "0 0 8px #ff2d78, 0 0 20px #ff2d7840",
        neon_purple: "0 0 8px #9333ea, 0 0 20px #9333ea40",
        card: "0 0 0 1px #ff2d7860, 0 0 20px #ff2d7820",
      },
    },
  },
  plugins: [],
};
export default config;
