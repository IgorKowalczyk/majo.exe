import eslintConfig from "@igorkowalczyk/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig([
 eslintConfig.base,
 eslintConfig.node,
 eslintConfig.typescript,
 {
  name: "Override",
  rules: {
   "require-await": "off",
  },
 },
]);
