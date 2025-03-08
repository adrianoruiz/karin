/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        orange: '#F0835C',
        'roxo-azul': '#4753A6',
        'odonto-green': '#67D386',
        'roxo-petshop': '#6A3B74',
        lighten: '#E4F7FE',
        'whatsapp-green': '#DCF8C7',
        info: '#0071BC',
        answer: '#2E70E8',
        lightblue: '#E2F8FF',
        positive: '#33D16E',
        warning: '#FFB319',
        negative: '#d10000',
        dark: '#041619',
        dark2: '#424242',
        accent: '#67D386',
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}