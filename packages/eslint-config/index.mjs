import importRules from "eslint-plugin-import";
import prettierRules from "eslint-plugin-prettier";
import turboRules from "eslint-plugin-turbo";
import globals from "globals";

// @igorkowalczyk/eslint-config uses old version of eslint config
// import defaultConfig from "@igorkowalczyk/eslint-config";

export default {
 plugins: {
  turbo: turboRules,
  prettier: prettierRules,
  import: importRules,
 },
 languageOptions: {
  ecmaVersion: "latest",
  globals: {
   ...globals.browser,
   ...globals.node,
   ...globals.es2021,
   ...globals.commonjs,
  },
  sourceType: "module",
 },
 ignores: ["build/**", "coverage/**", "tmp/**"],
 rules: {
  "turbo/no-undeclared-env-vars": "warn",
  "no-lonely-if": "error",
  "linebreak-style": ["error", "unix"],
  "prettier/prettier": "warn",
  quotes: ["error", "double"],
  semi: ["warn", "always"],
  "comma-dangle": [
   "error",
   {
    arrays: "always-multiline",
    objects: "always-multiline",
    imports: "always-multiline",
    exports: "always-multiline",
    functions: "never",
   },
  ],
  "no-eval": "error",
  "func-names": ["error", "as-needed"],
  camelcase: ["warn", { properties: "never", ignoreDestructuring: true }],
  "no-unused-vars": ["warn", { argsIgnorePattern: "^_", ignoreRestSiblings: true }],
  "import/order": [
   "warn",
   {
    groups: ["external", "internal", "parent", "sibling", "index", "builtin"],
    "newlines-between": "never",
    alphabetize: {
     order: "asc",
     caseInsensitive: true,
    },
   },
  ],
  "prefer-arrow-callback": "error",
  "block-spacing": "error",
  "comma-spacing": "error",
  "keyword-spacing": "error",
  "space-infix-ops": "error",
  "space-unary-ops": "error",
  "brace-style": "error",
  "object-curly-spacing": ["error", "always"],
  "space-before-function-paren": [
   "error",
   {
    anonymous: "never",
    named: "never",
    asyncArrow: "always",
   },
  ],
  "space-in-parens": ["error", "never"],
  "array-bracket-spacing": ["error", "never"],
  "template-curly-spacing": ["error", "never"],
  "computed-property-spacing": ["error", "never"],
  "no-use-before-define": ["error", { functions: true, classes: true, variables: true }],
  "no-label-var": "error",
  "no-undef": "error",
  "no-undefined": "off",
  complexity: ["warn", 20],
  "no-alert": "error",
  "require-await": "off",
  yoda: "error",
  "no-empty": "error",
  "no-extra-semi": "error",
  "valid-typeof": ["error", { requireStringLiterals: true }],
  "jsx-quotes": ["off", "prefer-double"],
  "unicode-bom": ["error", "never"],
  "no-process-env": "off",
  "no-process-exit": "off",
  "global-require": "error",
 },
};
