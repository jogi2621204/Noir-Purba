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
        // Remapped to Apple dark surface palette
        ocean: {
          950: "#000000", // surface-black
          900: "#111111", // deep surface
          800: "#1c1c1e", // card fill
          700: "#272729", // surface-tile-1
          600: "#3a3a3c", // border
          500: "#48484a", // subtle border
        },
        // Remapped to Apple blue palette
        teal: {
          300: "#86c4f8", // blue light tint
          400: "#2997ff", // sky link blue (dark surfaces)
          500: "#0066cc", // action blue primary
          600: "#0071e3", // action blue focus
        },
        glow: "#0066cc",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Inter",
          "sans-serif",
        ],
        display: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Inter",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Menlo",
          "monospace",
        ],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "teal-gradient": "linear-gradient(135deg, #0066cc 0%, #2997ff 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
