// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#BAC2DE",
          200: "#9FAAD1",
          300: "#7586BD",
          400: "#687AB6",
          500: "#5065A8",
          600: "#495B97",
          700: "#42538A",
          800: "#3C4B7C",
          900: "#35426E",
        },
        secondary: "#F2EEE4",
      },
    },
    variants: {},
    plugins: [],
  },
}
