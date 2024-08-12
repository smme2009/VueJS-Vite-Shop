/** @type {import('tailwindcss').Config} */
export default {
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  content: [],
  theme: {
    extend: {
      screens: {
        xs: '1px',
      },
    },
  },
  plugins: [],
}

