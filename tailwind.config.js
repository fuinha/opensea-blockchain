/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
      'poppins': ['Poppins'],
    },
    extend: {
      screens: {
        'ssm': '420px',
      }
    },
  },
  plugins: [],
}
