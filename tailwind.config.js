/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ls-black':      '#0a0a0a',
        'ls-white':      '#fafafa',
        'ls-gold':       '#D4AF37',
        'ls-gold-light': '#E8C84A',
        'ls-gold-dark':  '#b5952f',
        'ls-gold-dim':   '#D4AF3720',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to':   { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          'from': { opacity: '0', transform: 'translateY(-8px)' },
          'to':   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in':    'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}
