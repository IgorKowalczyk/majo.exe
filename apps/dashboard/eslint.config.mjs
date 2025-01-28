import eslintConfig from "@igorkowalczyk/eslint-config";

export default [
 // prettier
 ...eslintConfig.base,
 ...eslintConfig.react,
 ...eslintConfig.next,
 ...eslintConfig.typescript,
 ...eslintConfig.node,
 ...eslintConfig.tailwindcss,
 {
  name: "Override",
  rules: {
   "typescript/no-explicit-any": "off",
   "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "off",
   "@eslint-react/no-forward-ref": "off",
  },
 },
];
