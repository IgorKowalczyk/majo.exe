import eslintConfig from "@igorkowalczyk/eslint-config/flat";
import turboPlugin from "eslint-plugin-turbo";

export default [
 {
  ...eslintConfig,
  plugins: {
   ...eslintConfig.plugins,
   turbo: turboPlugin,
  },
  rules: {
   ...eslintConfig.rules,
   "turbo/no-undeclared-env-vars": "warn",
  },
 },
];
