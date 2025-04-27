import eslintConfig from "@igorkowalczyk/eslint-config";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
 // prettier
 // @ts-expect-error Wrong type
 ...eslintConfig.base,
 ...eslintConfig.react,
 ...eslintConfig.next,
 ...eslintConfig.node,
 ...eslintConfig.typescript,
 globalIgnores([".next/**"], "Ignore next.js build files"),
 {
  name: "Override",
  rules: {
   "typescript/no-explicit-any": "off",
   "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "off",
   "@eslint-react/no-forward-ref": "off",
   "@eslint-react/no-array-index-key": "off",
  },
 },
]);
