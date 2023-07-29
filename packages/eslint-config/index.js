module.exports = {
 extends: ["@igorkowalczyk/eslint-config", "turbo"],
 settings: {
  next: {
   rootDir: ["apps/*/", "packages/*/"],
  },
 },
 rules: {
  "turbo/no-undeclared-env-vars": "warn",
 },
 env: {
  node: true,
  es2020: true,
  browser: true,
  es6: true,
 },
 parserOptions: {
  sourceType: "module",
  ecmaVersion: "latest",
 },
};
