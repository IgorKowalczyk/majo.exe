module.exports = {
 root: true,
 extends: ["@majoexe/eslint-config"],
 plugins: ["json"],
 rules: {
  "json/*": ["error", "allowComments"],
 },
 env: {
  node: true,
  es6: true,
 },
 parserOptions: {
  ecmaVersion: "latest",
  sourceType: "module",
 },
};
