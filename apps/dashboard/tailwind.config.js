const svgToDataUri = require("mini-svg-data-uri");
const plugin = require("tailwindcss/plugin");

module.exports = {
 darkMode: "class",
 content: ["./pages/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./config.js"],
 theme: {
  transparent: "transparent",
  current: "currentColor",
  extend: {
   minHeight: (theme) => ({
    ...theme("spacing"),
   }),
   minWidth: (theme) => ({
    ...theme("spacing"),
   }),
   colors: {
    "background-primary": "#101110",
    "background-secondary": "#161617",
    "background-navbar": "#161617",
    "background-menu": "#161617",
    "background-menu-button": "#212120",
    "accent-primary": "#5865F2",
    "button-primary": "#5865F2",
    "button-primary-hover": "#4753c5",
    "button-secondary": "#4e5058",
    "button-secondary-hover": "#6c6f79",
    "button-action-primary": "#ea4d4d",
    "button-action-hover": "#ff5f5f",
   },
   keyframes: {
    shimmer: {
     "100%": {
      transform: "translateX(100%)",
     },
    },
    loader: {
     "0%": {
      height: "0.5rem",
      opacity: 0.2,
     },
     "50%": {
      height: "1rem",
      opacity: 1,
     },
     "100%": {
      height: "0.5rem",
      opacity: 0.2,
     },
    },
   },
  },
 },
 plugins: [
  plugin(({ matchUtilities }) => {
   matchUtilities({
    "bg-grid": (value) => ({
     backgroundImage: `url("${svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`)}")`,
    }),
   });
  }),
  /* eslint-disable global-require */
  require("tailwindcss-text-fill"),
  require("tailwind-gradient-mask-image"),
  require("@headlessui/tailwindcss"),
  require("@igorkowalczyk/is-browser"),
  /* eslint-enable global-require */
 ],
};
