/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(27, 100, 41)',
        // primaryHover: 'rgba(27, 100, 41, 0.8)',
        primaryHover: 'rgb(23, 84, 35)',
      },
    },
  },
  plugins: [],
};
