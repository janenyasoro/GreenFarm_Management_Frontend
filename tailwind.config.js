/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        forest:     "#2C5F2D",
        forestDark: "#1B3B1C",
        moss:       "#6E9B4E",
        mossLight:  "#E7F0DD",
        gold:       "#D9A441",
        ink:        "#243325",
        muted:      "#5B6B58",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
