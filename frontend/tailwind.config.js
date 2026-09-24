export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        victorian: {
          eggshell: '#F0EAD6',
          offwhite: '#FAF9F6',
          ink: '#2b2b2b',
          charcoal: '#36454F',
          gold: '#C5B358',
          paper: '#F5F5F0',
          burgundy: '#6B1F3A',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        calligraphy: ['"Great Vibes"', 'cursive'],
        sans: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
