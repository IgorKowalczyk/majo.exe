module.exports = {
 root: true,
 extends: ["@majoexe/eslint-config", "next"],
 rules: {
  "react/prop-types": "off",
  "react/no-unescaped-entities": "off",
  "@next/next/no-html-link-for-pages": "off",
 },
 parserOptions: {
  babelOptions: {
   presets: [require.resolve("next/babel")],
  },
 },
};
