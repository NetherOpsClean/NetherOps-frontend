import { fontFamily } from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jersey: ['"Jersey 10"', 'sans-serif'],
        pixelify: ['"Pixelify Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}