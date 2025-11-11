import baseConfig from "@igorkowalczyk/eslint-config/base";
import nextConfig from "@igorkowalczyk/eslint-config/next";
import nodeConfig from "@igorkowalczyk/eslint-config/node";
import prettierConfig from "@igorkowalczyk/eslint-config/prettier";
import reactConfig from "@igorkowalczyk/eslint-config/react";
import typescriptConfig from "@igorkowalczyk/eslint-config/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig(
  ...baseConfig,
  ...reactConfig,
  ...nextConfig,
  ...nodeConfig,
  ...typescriptConfig,
  ...prettierConfig,
  globalIgnores([".next/**"], "Ignore next.js build files"),
  {
    name: "Override",
    rules: {
      "typescript/no-explicit-any": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/purity": "off",
      "react-hooks/incompatible-library": "off",
      "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "off",
      "@eslint-react/no-forward-ref": "off",
      "@eslint-react/no-array-index-key": "off",
    },
  }
);
