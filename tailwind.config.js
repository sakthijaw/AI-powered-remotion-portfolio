/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      colors: {
        'jack-bg': '#0C0C0C',
        'jack-text': '#D7E2EA',
      },
    },
  },
  plugins: [],
}
