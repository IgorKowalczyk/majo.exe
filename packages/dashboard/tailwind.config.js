const { fontFamily } = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const svgToDataUri = require("mini-svg-data-uri");

module.exports = {
 darkMode: "class",
 content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./config.js"],
 theme: {
  extend: {
   fontFamily: {
    inter: ["Inter", ...fontFamily.sans],
   },
   colors: {
    "background-primary": "#111927",
    "background-navbar": "#141f2f",
    "background-menu": "#162235",
    "background-secondary": "#1c283d",
    "accent-primary": "#2869ff",
    "button-primary": "#2869ff",
    "button-primary-hover": "#6390fd",
    "button-secondary": "#1c283d",
    "button-secondary-hover": "#1f2d44",
    "button-action-primary": "#ea4d4d",
    "button-action-hover": "#ff5f5f",
   },
   backgroundImage: {
    shapes: `url('/assets/svg/background.svg')`,
   },
   fontSize: {
    normal: ["1.1rem", "1.45rem"],
   },
   animation: {
    movebackground: "movebg 60s linear infinite",
   },
   keyframes: {
    movebg: {
     "0% 100%": { backgroundPosition: "0% 0%" },
     "50%": { backgroundPosition: "-10% 10%" },
    },
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
