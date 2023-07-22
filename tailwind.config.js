/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      // Whatever put here overrides the entire tailwind default setup
      sans: 'Roboto Mono, monospace',
    },
    extend: {
      // Whatever put here adds on top of the default tailwind setup
      colors: { pizza: '#123456' },
      // The full list of feature keys available @ https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
