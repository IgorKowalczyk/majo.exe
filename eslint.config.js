import eslintConfig from "@igorkowalczyk/eslint-config";

export default [
 // prettier
 ...eslintConfig.base,
 //...eslintConfig.react,
 //...eslintConfig.next,
 ...eslintConfig.node,
 ...eslintConfig.typescript,
 //...eslintConfig.tailwindcss,
 {
  name: "Override",
  rules: {
   "require-await": "off",
  },
 },
];
