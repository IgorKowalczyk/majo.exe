import eslintConfig from "@igorkowalczyk/eslint-config";
import type { Linter } from "eslint";

export default [
 // prettier
 ...eslintConfig.base,
 ...eslintConfig.node,
 ...eslintConfig.typescript,
 {
  name: "Override",
  rules: {
   "require-await": "off",
  },
 },
] satisfies Linter.Config[];
