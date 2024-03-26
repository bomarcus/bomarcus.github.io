/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.js"],
  darkMode: "selector",
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        bungee: ["Bungee", "cursive"], // Add this line
      },
    },
  },
  plugins: [],
};
