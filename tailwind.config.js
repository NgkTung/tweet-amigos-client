/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#649dad",
      },
      fontFamily: {
        daruma: ["Darumadrop One", "sans-serif"],
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
