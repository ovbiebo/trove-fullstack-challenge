module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Manrope', 'sans-serif'],
      },
      blur: {
        '4xl': '100px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
