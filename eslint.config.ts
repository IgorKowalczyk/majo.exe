import eslintConfig from "@igorkowalczyk/eslint-config";
import type { Linter } from "eslint";

export default [
 // prettier
 // @ts-expect-error Wrong type
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
