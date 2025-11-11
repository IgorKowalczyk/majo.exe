import baseConfig from "@igorkowalczyk/eslint-config/base";
import nodeConfig from "@igorkowalczyk/eslint-config/node";
import typescriptConfig from "@igorkowalczyk/eslint-config/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig(
 //
 ...baseConfig,
 ...nodeConfig,
 ...typescriptConfig,
 globalIgnores(["packages/database/prisma/client/**"], "Ignore prisma client files"),
 {
  name: "Override",
  rules: {
   "require-await": "off",
  },
 }
);
