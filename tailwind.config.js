/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        bungee: ["Bungee", "cursive"], // Add this line
      },
    },
  },
  plugins: [],
};
