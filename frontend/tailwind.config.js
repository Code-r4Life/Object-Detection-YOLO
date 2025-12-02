/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#10b981",
        dark: {
          bg: "#020617", // Slate 950 - deeper dark
          card: "#0f172a", // Slate 900
          text: "#f8fafc",
          border: "#1e293b",
        },
        light: {
          bg: "#ffffff",
          card: "#f8fafc",
          text: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
