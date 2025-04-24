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
      borderRadius: {
        17: "17px",
      },
      spacing: {
        "main-calc": "calc(100dvh - 80px)", // headerHeight = 80px
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

export default config
