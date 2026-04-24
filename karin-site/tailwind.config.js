/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'aloe': ['Aloe-Medium', 'serif'],
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 7vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'eyebrow': ['0.75rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      colors: {
        ink: {
          DEFAULT: '#2D2B28',
          soft: '#4A4744',
          muted: '#6F6A64',
        },
        sand: {
          DEFAULT: '#F5E6D3',
          soft: '#F5F1EB',
          warm: '#EADFCE',
        },
        clay: {
          DEFAULT: '#8B8379',
          soft: '#A39B90',
          dark: '#635C57',
          ink: '#6B5E57',
          mist: '#B7AC9F',
        },
        accent: {
          crm: '#435B87',
        },
        primary: '#8B7355',
        secondary: '#A39081',
        brown: {
          100: '#F5F1EB',
          200: '#E8E0D5',
          300: '#D2C4B6',
          400: '#BBA797',
          500: '#A39081',
          600: '#8B7355',
          700: '#6D5A43',
          800: '#4F4132',
          900: '#322920',
        },
      },
    },
  },
  plugins: [],
}
