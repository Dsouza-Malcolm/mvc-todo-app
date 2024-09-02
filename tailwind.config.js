/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/flowbite/**/*.js'],

  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: '#021526',
        ocean: '#03346E',
        sky: '#6EACDA',
        sand: '#E2E2B6',
      },
      fontFamily: {
        mulish: ['Mulish', 'sans-serif'],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
