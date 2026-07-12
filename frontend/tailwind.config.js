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
          300: '#e8c84a',
          400: '#d9b83c',
          500: '#c9a84c',
          600: '#b8922e',
          700: '#9a7a24',
          800: '#7d621c',
          900: '#5c4814',
          950: '#3a2d0a',
        },
        'gold-dark': '#b8922e',
        'gold-shine': '#e8c84a',
        'tea-green': '#1a3a2a',
        forest: {
          50: '#e8f0ec',
          100: '#c8ddd2',
          200: '#9bbdaa',
          300: '#6e9d82',
          400: '#4a7d5e',
          500: '#2d5e42',
          600: '#234a34',
          700: '#1a3a2a',
          800: '#122a1e',
          900: '#0a1a12',
          950: '#050d09',
        },
        terracotta: {
          50: '#f8f0ea',
          100: '#f0ddd0',
          200: '#e0bba1',
          300: '#d09972',
          400: '#c07a4a',
          500: '#a0623a',
          600: '#804e2e',
          700: '#603a22',
          800: '#402818',
          900: '#301c12',
          950: '#20120c',
        },
        cream: {
          DEFAULT: '#f5efe4',
          dark: '#e8dfd0',
          light: '#faf7f0',
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
