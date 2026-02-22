/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./_includes/**/*.html",
    "./_layouts/**/*.html",
    "./_posts/**/*.md",
    "./fr/**/*.html",
    "./ar/**/*.html",
    "./assets/js/**/*.js",
    "!./node_modules/**"
  ],
  safelist: [
    { pattern: /^(bg|text|border|from|via|to)-(cnss|cmr|cnops)(-light|-dark)?$/ },
    'border-l-4',
    'hover:bg-cnss-dark',
    'hover:bg-cmr-dark',
    'hover:bg-cnops-dark',
  ],
  theme: {
    extend: {
      colors: {
        'cnss': {
          DEFAULT: '#005a9e',
          light: '#e6f7ff',
          dark: '#004080'
        },
        'cmr': {
          DEFAULT: '#008080',
          light: '#f0f9f9',
          dark: '#006060'
        },
        'cnops': {
          DEFAULT: '#006400',
          light: '#f0f7f0',
          dark: '#004d00'
        },
        'primary': '#005a9e',
        'secondary': '#008080',
        'footer': {
          DEFAULT: '#1a1a2e',
          text: '#a9b3be',
          border: '#2d2d44'
        }
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'tajawal': ['Tajawal', 'sans-serif']
      }
    }
  },
  plugins: []
}
