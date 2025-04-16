/** @type {import('tailwindcss').Config} */
export default {
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
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
