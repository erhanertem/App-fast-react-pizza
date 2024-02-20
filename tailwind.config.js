/** @type {import('tailwindcss').Config} */

// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Overrides the specific standard definition
    fontFamily: {
      sans: 'Roboto Mono, monospace',
      // pizza: 'Bebas Neue Regular',
    },

    extend: {
      // Adds on top of existing standard definitions
      fontFamily: {
        pizza: 'Bebas Neue Regular',
      },
      colors: {
        pizza: '#123456',
      },
      height: {
        // This solves the problem of mobile browsers not provding 100vh problem
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
