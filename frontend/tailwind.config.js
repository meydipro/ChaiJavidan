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
          100: '#f8edc8',
          200: '#f0db8a',
          300: '#e8d48a',
          400: '#d4b85c',
          500: '#c9a84c',
          600: '#a88a38',
          700: '#8b6914',
          800: '#6d5210',
          900: '#4f3b0c',
          950: '#312408',
        },
        'gold-dark': '#8b6914',
        'gold-shine': '#d4b85c',
        'tea-green': '#1B3A2B',
        forest: {
          50: '#e4ede8',
          100: '#c0d9cc',
          200: '#8ab89c',
          300: '#5a9470',
          400: '#4a7d5e',
          500: '#2d5e42',
          600: '#234a34',
          700: '#1B3A2B',
          800: '#122a1e',
          900: '#0a1a12',
          950: '#050d09',
        },
        terracotta: {
          50: '#f8f0ea',
          100: '#f0ddd0',
          200: '#e0bba1',
          300: '#d09972',
          400: '#8b6914',
          500: '#6b4f1a',
          600: '#5a4216',
          700: '#493512',
          800: '#38280e',
          900: '#271c0a',
          950: '#161006',
        },
        cream: {
          DEFAULT: '#FAF7F0',
          dark: '#F0EBE0',
          light: '#FAF7F0',
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
