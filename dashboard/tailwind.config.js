const plugin = require("tailwindcss/plugin");
const svgToDataUri = require("mini-svg-data-uri");

module.exports = {
 darkMode: "class",
 content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./config.js"],
 theme: {
  extend: {
   fontFamily: {
    poppins: ["Poppins", "sans-serif"],
   },
   colors: {
    "background-primary": "#111927",
    "background-navbar": "#141f2f",
    "background-secondary": "#1c283d",
    "button-primary": "#2869ff",
    "button-primary-hover": "#6390fd",
    "button-action-primary": "#ea4d4d",
    "button-action-hover": "#ff5f5f",
   },
  },
 },
 plugins: [
  plugin(function ({ matchUtilities }) {
   matchUtilities({
    "bg-grid": (value) => ({
     backgroundImage: `url("${svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`)}")`,
    }),
   });
  }),
  require("tailwindcss-text-fill"),
  require("tailwind-gradient-mask-image"),
  require("@headlessui/tailwindcss"),
  require("@igorkowalczyk/is-browser"),
 ],
};
