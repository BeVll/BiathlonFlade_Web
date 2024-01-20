/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      // default theme to extend on custom themes
      layout: {

        spacingUnit: 4, // in px
        disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
        dividerWeight: "1px", // h-divider the default height applied to the divider component
        fontSize: {
          tiny: "0.75rem", // text-tiny
          small: "0.875rem", // text-small
          medium: "1rem", // text-medium
          large: "1.125rem", // text-large
        },
        fontFamily:{
          'display': ['Oswald'],
          'body': ['"Open Sans"'],
        },
        lineHeight: {
          tiny: "1rem", // text-tiny
          small: "1.25rem", // text-small
          medium: "1.5rem", // text-medium
          large: "1.75rem", // text-large
        },
        radius: {
          small: "12px", // rounded-small
          medium: "14px", // rounded-medium
          large: "16px", // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "2px", // border-medium (default)
          large: "3px", // border-large
        },
      },
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            background: "#F5F5F5",
            primary: "#26A17F",

          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            primary: "#26A17F",
            focus: "#26A17F",


          }, // dark theme colors
          extend: {
            animation: {
              fade: 'fadeOut 5s ease-in',
            },

            // that is actual animation
            keyframes: theme => ({
              fadeOut: {
                '0%': { backgroundColor: theme('opacity.0') },
                '100%': { backgroundColor: theme('opacity.100') },
              },
            }),
          }
        },
        // ... custom themes
      },
    }),
  ],
}