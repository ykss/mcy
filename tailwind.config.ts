import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fffcf6",
        secondary: "#f0f0f0",
        accent: "#b4dfc3",
      },
      fontFamily: {
        sans: ["Noto Sans", "Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        17: "17px",
      },
      spacing: {
        "main-calc": "calc(100dvh - 80px)", // headerHeight = 80px
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
      },
      animation: {
        "drawer-in": "drawer-in 0.3s ease-out",
        "drawer-out": "drawer-out 0.3s ease-in",
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
      },
      animation: {
        "drawer-in": "drawer-in 0.3s ease-out",
        "drawer-out": "drawer-out 0.3s ease-in",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  corePlugins: {
    preflight: false,
  },
}

export default config
