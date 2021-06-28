module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/templates/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        custom: {
          "white-80": "rgba(255,255,255,0.8)",
          "black-70": "rgba(0,0,0,0.7)",
          lightgray: "#E8E8E8",
          "lightgray-75": "rgba(232, 232, 232, 0.75)",
          darkblue: "#0C3C78",
          "darkblue-75": "rgba(12, 60, 120,0.75)",
          red: "#FF5757",
        },
      },
      spacing: {
        30: "7.5rem",
      },
      fontSize: {
        18: "18px",
        24: "24px",
        30: "30px",
        36: "36px",
      },
      lineHeight: {
        21: "21px",
        24: "24px",
        28: "28px",
        36: "36px",
        42: "42px",
      },
      fontFamily: {
        sans: [
          '"Josefin Sans"',
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        slab: [
          '"Josefin Slab"',
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
