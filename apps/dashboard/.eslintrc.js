module.exports = {
 root: true,
 extends: ["@igorkowalczyk/eslint-config/legacy", "next"],
 // plugins: ["eslint-plugin-react-compiler"],
 rules: {
  "react/no-unescaped-entities": "off",
  "@next/next/no-html-link-for-pages": "off",
  // "react-compiler/react-compiler": "warn",
 },
 env: {
  node: true,
  es2021: true,
  browser: true,
  es6: true,
 },
 parserOptions: {
  sourceType: "module",
  ecmaVersion: "latest",
  babelOptions: {
   presets: [require.resolve("next/babel")],
  },
 },
};
