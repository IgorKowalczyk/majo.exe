/* eslint-disable no-undef */
module.exports = {
 root: true,
 extends: ["@igorkowalczyk/eslint-config", "turbo"],
 rules: {
  "turbo/no-undeclared-env-vars": "warn",
 },
 env: {
  node: true,
  browser: true,
 },
 parserOptions: {
  sourceType: "module",
  ecmaVersion: "latest",
 },
};
