export const extends = ["@igorkowalczyk/eslint-config", "turbo"];
export const settings = {
  next: {
   rootDir: ["apps/*/", "packages/*/"],
  },
 };
export const rules = {
  "turbo/no-undeclared-env-vars": "warn",
  "no-lonely-if": "error",
 };
export const env = {
  node: true,
  es2020: true,
  browser: true,
  es6: true,
 };
export const parserOptions = {
  sourceType: "module",
  ecmaVersion: "latest",
 };
