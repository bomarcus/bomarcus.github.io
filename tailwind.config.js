/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{html,js}",
    "./index.html",
    "./**/*.html",
    "./input.css", // Add this line
  ],
  theme: {
    extend: {      fontFamily: {
        'bungee': ['Bungee', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
      }},
  },
  plugins: [],
}