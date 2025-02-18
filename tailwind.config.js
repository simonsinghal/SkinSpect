/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", //  <--- IMPORTANT: Adjust these paths
    "./public/index.html",         //  <--- IMPORTANT: Include this if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}