/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Lora', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        ocean: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#0c8be8',
          600: '#006ec6',
          700: '#01579f',
          800: '#064a83',
          900: '#0b3f6d',
        },
        sunset: {
          50: '#fff7ed',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        cream: '#FBF8F3',
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
}
