/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ls-black': '#0a0a0a',
        'ls-white': '#fafafa',
        'ls-gold': '#D4AF37',
        'ls-gold-hover': '#b5952f',
      },
    },
  },
  plugins: [],
}
