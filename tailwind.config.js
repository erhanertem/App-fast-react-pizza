/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    theme: {
      // fontFamily: {
      //   // DESTRUCTIVE FONT FAMILY ADDITION
      //   pizza: "Roboto Mono, monospace",
      // },
    },
    extend: {
      fontFamily: {
        // NON-DESTRUCTIVE FONT FAMILY ADDITION
        sans: "Roboto Mono, monospace",
      },
      colors: {
        // NON-DESTRUCTIVE CUSTOM COLOR ADDITION
        pizza: "#123456",
      },
    },
  },
  plugins: [],
};
