/** @type {import('tailwindcss').Config} */
const defaultConfig = require('tailwindcss/defaultConfig')

module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    fontFamily: {
      main: ['Montserrat', ...defaultConfig.theme.fontFamily.sans],
      body: ['Cabin', ...defaultConfig.theme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
}
