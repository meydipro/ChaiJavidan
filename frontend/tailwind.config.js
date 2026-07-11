/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf8ef',
          100: '#faefcc',
          200: '#f5df8a',
          300: '#f0ca4e',
          400: '#e8b52a',
          500: '#D4A73C',
          600: '#C49428',
          700: '#A67C1E',
          800: '#7D5E16',
          900: '#5C4512',
          950: '#3A2B0A',
        },
        'gold-dark': '#C49428',
        'gold-shine': '#E8C84A',
        'tea-green': '#3B5E3A',
        forest: {
          50: '#f0f7f0',
          100: '#dceedd',
          200: '#b8dcba',
          300: '#88c48c',
          400: '#5ba662',
          500: '#3B5E3A',
          600: '#2d4a2c',
          700: '#243b24',
          800: '#1c2e1c',
          900: '#142214',
          950: '#0a140a',
        },
        terracotta: {
          50: '#fdf4f0',
          100: '#fbe6dd',
          200: '#f6c9b8',
          300: '#efa58b',
          400: '#e68060',
          500: '#C2714F',
          600: '#a85d3f',
          700: '#8c4a32',
          800: '#6e3a28',
          900: '#522b1e',
          950: '#381c13',
        },
        cream: {
          DEFAULT: '#FAF7F0',
          dark: '#F0EBE0',
          light: '#FDFBF7',
        },
      },
      fontFamily: {
        'iransans': ['IRANSans', 'sans-serif'],
        'yekan': ['IRANSans', 'sans-serif'],
        'vazir': ['IRANSans', 'sans-serif'],
        'shabnam': ['IRANSans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.23, 1.0, 0.32, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
