/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
  sans: ['"neue-haas-grotesk-display"', 'sans-serif'],
  haas: ['"neue-haas-grotesk-display"', 'sans-serif'], // optional alias
},

      colors: {
        futuristic: {
          bg: '#000000',
          accent: '#00f5d4',
          muted: '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
};
