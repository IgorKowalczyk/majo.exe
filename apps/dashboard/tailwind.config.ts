import tailwindHeadlessui from "@headlessui/tailwindcss";
import { globalConfig } from "@majoexe/config";
import { adjustColor } from "@majoexe/util/functions/util";
import tailwindTypography from "@tailwindcss/typography";
import svgToDataUri from "mini-svg-data-uri";
// @ts-expect-error No types available
import tailwindGradientMaskImage from "tailwind-gradient-mask-image";
import plugin from "tailwindcss/plugin";
// @ts-expect-error No types available
import tailwindTextFill from "tailwindcss-text-fill";
import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const tailwindConfig = {
 darkMode: "class",
 content: [
  // prettier
  "./app/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
 ],
 theme: {
  extend: {
   colors: {
    "background-primary": "#101110",
    "background-secondary": "#161617",
    "background-navbar": "#161617",
    "background-menu": "#161617",
    "background-menu-button": "#212120",
    "accent-primary": globalConfig.defaultColor,
    "button-primary": globalConfig.defaultColor,
    "button-primary-hover": adjustColor(globalConfig.defaultColor, 20, "darken"),
    "button-secondary": "#4e5058",
    "button-secondary-hover": adjustColor("#4e5058", 20, "lighten"),
    "button-action-primary": "#ea4d4d",
    "button-action-hover": adjustColor("#ea4d4d", 20, "darken"),
   },
   backgroundImage: {
    "main-gradient": "linear-gradient(180deg, #101110 calc(100% - 400px), #161617 100%);",
   },
   animation: {
    shimmerText: "shimmerText 8s infinite",
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
   },

   keyframes: {
    shimmer: {
     "100%": {
      transform: "translateX(100%)",
     },
    },

    shimmerText: {
     "0%, 90%, 100%": {
      "background-position": "calc(-100% - var(--shimmer-width)) 0",
     },
     "30%, 60%": {
      "background-position": "calc(100% + var(--shimmer-width)) 0",
     },
    },

    loader: {
     "0%": {
      height: "0.5rem",
      opacity: "0.2",
     },
     "50%": {
      height: "1rem",
      opacity: "1",
     },
     "100%": {
      height: "0.5rem",
      opacity: "0.2",
     },
    },

    // blink-182
    blinking: {
     "0%": {
      opacity: "0.2",
     },
     "50%": {
      opacity: "1",
     },
     "100%": {
      opacity: "0.2",
     },
    },

    "accordion-down": {
     from: { height: "0" },
     to: { height: "var(--radix-accordion-content-height)" },
    },
    "accordion-up": {
     from: { height: "var(--radix-accordion-content-height)" },
     to: { height: "0" },
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
  tailwindAnimate,
  tailwindTextFill,
  tailwindGradientMaskImage,
  tailwindHeadlessui,
  tailwindTypography,
 ],
} satisfies Config;

export default tailwindConfig;
