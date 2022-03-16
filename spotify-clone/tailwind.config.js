module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    screen: {
      "xs": "400px"
    }
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
