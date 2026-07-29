/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        harvest: {
          50: "#f3f7ee",
          100: "#e2ecd4",
          200: "#c7dbac",
          300: "#a4c47a",
          400: "#84ad54",
          500: "#63893a",
          600: "#4c6d2c",
          700: "#3b5424",
          800: "#31431f",
          900: "#2a391d",
        },
        clay: {
          500: "#b8703f",
          600: "#9c5a30",
        },
        soil: {
          900: "#221c14",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
