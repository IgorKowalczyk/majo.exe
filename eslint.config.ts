import eslintConfig from "@igorkowalczyk/eslint-config";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
 eslintConfig.base,
 eslintConfig.node,
 eslintConfig.typescript,

 globalIgnores(["packages/database/prisma/client/**"], "Ignore prisma client files"),
 {
  name: "Override",
  rules: {
   "require-await": "off",
  },
 },
]);
