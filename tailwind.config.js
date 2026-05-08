/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mmo-dark': '#090e17',
        'mmo-card': '#111726',
      }
    },
  },
  plugins: [],
}