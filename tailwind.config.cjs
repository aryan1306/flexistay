// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#E26465",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};

module.exports = config;
