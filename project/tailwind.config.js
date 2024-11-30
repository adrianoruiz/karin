/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8B7355',  // Main brown color
        'secondary': '#A39081', // Lighter brown
        'accent': '#F5F1EB',   // Light beige background
        'brown': {
          100: '#F5F1EB',
          200: '#E8E0D5',
          300: '#D2C4B6',
          400: '#BBA797',
          500: '#A39081',
          600: '#8B7355',
          700: '#6D5A43',
          800: '#4F4132',
          900: '#322920',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}