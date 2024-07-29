import eslintConfig from "@igorkowalczyk/eslint-config";

export default [
 // prettier
 ...eslintConfig.base,
 ...eslintConfig.react,
 ...eslintConfig.next,
 ...eslintConfig.node,
 ...eslintConfig.tailwindcss,
 {
  rules: {
   "@eslint-react/no-unstable-context-value": "off",
   "react-a11y/click-events-have-key-events": "off",
   "react-a11y/no-noninteractive-element-interactions": "off",
   "react-a11y/no-static-element-interactions": "off",
  },
 },
];
