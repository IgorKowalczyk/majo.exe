module.exports = {
 extends: ["@igorkowalczyk/eslint-config", "turbo"],
 env: {
  node: true,
  es2021: true,
  browser: true,
  es6: true,
 },
 parserOptions: {
  sourceType: "module",
  ecmaVersion: "latest",
 },
};
