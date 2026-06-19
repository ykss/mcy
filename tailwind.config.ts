import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "320px",  // iPhone SE
      sm: "375px",  // iPhone 표준
      md: "390px",  // iPhone 14/15
      lg: "430px",  // iPhone 15 Plus/Pro Max
    },
    extend: {
      colors: {
        primary: "#fffcf6",
        secondary: "#f0f0f0",
        accent: "#b4dfc3",
      },
      fontFamily: {
        sans: ["Pretendard", "Noto Sans", "Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        17: "17px",
      },
      spacing: {
        "main-calc": "calc(100dvh - 64px)",
      },
      keyframes: {
        "drawer-in": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "drawer-out": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "drawer-in": "drawer-in 0.3s ease-out",
        "drawer-out": "drawer-out 0.3s ease-in",
        "fade-up": "fade-up 0.6s ease forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  corePlugins: {
    preflight: false,
  },
}

export default config
