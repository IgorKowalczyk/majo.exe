module.exports = {
 extends: ["@majoexe/eslint-config"],
 plugins: ["json"],
 rules: {
  "json/*": ["error", "allowComments"],
 },
};
