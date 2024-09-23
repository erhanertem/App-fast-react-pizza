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
      height: {
        // NON-DESTRUCTIVE OVERRIDE EXISTING PROPERTY
        /*
        dvh (Dynamic Viewport Height)
        Definition: 1dvh is equal to 1% of the height of the dynamic viewport.
        Behavior: Unlike vh, dvh adjusts when the viewport size changes dynamically. This is particularly useful for mobile devices where the height of the viewport may change when browser toolbars shrink, or when virtual keyboards appear/disappear. dvh recalculates based on the visible part of the viewport at any given time, making it more reliable for responsive designs, especially on mobile.
        Use Case: dvh is a better choice when you need dynamic responsiveness to changes in the viewport, such as resizing, mobile keyboards, or shrinking browser toolbars.
        */
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
