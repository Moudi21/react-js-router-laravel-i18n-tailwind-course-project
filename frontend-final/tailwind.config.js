/** @type {import('tailwindc      textStroke: {
        '2': '2px',
      },
      textStrokeColor: theme => ({
        'primary-500': theme('colors.primary.500'),
      }),
      keyframes: {
        fadeIn: {
          '0%': {opacity: '0', transform: 'translateY(-10px)'},
          '100%': {opacity: '1', transform: 'translateY(0)'},
        },
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },ig} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
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
          950: '#082f49',
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        gradient: 'gradient 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': {opacity: '0', transform: 'translateY(-10px)'},
          '100%': {opacity: '1', transform: 'translateY(0)'},
        },
        gradient: {
          '0%, 100%': {'background-position': '0% 50%'},
          '50%': {'background-position': '100% 50%'},
        },
      },
    },
  },
  plugins: [ require( '@tailwindcss/forms' ) ],
};