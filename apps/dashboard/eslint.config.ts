import eslintConfig from "@igorkowalczyk/eslint-config";
import type { Linter } from "eslint";

export default [
 // prettier
 // @ts-expect-error Wrong type
 ...eslintConfig.base,
 ...eslintConfig.react,
 ...eslintConfig.next,
 ...eslintConfig.typescript,
 ...eslintConfig.node,
 ...eslintConfig.prettier,
 {
  name: "Override",
  rules: {
   "typescript/no-explicit-any": "off",
   "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "off",
   "@eslint-react/no-forward-ref": "off",
   "@eslint-react/no-array-index-key": "off",
  },
 },
] satisfies Linter.Config[];
