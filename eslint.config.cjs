const { defineConfig, globalIgnores } = require("eslint/config");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const reactRefresh = require("eslint-plugin-react-refresh");
const simpleImportSort = require("eslint-plugin-simple-import-sort");
const tanstackQuery = require("@tanstack/eslint-plugin-query");
const js = require("@eslint/js");
const tselint = require("typescript-eslint");
const prettierPlugin = require("eslint-plugin-prettier");
const prettierOptions = require("./.prettier.json");

module.exports = defineConfig([
  js.configs.recommended,
  ...tselint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        process: "readonly",
        __dirname: "readonly",
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },

    settings: {
      react: {
        version: "detect",
        pragma: "React",
        // tell ESLint to use the new JSX transform
        reactNamespace: "React",
        jsxRuntime: "automatic",
      },
    },

    plugins: {
      react: react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      "@tanstack/query": tanstackQuery,
      prettier: prettierPlugin,
    },

    rules: {
      // Recommended
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...tanstackQuery.configs.recommended.rules,

      // Prettier
      "prettier/prettier": ["error", prettierOptions],

      // Overrides
      "no-unused-vars": "off",
      "react/no-unescaped-entities": 0,
      "react/no-unknown-property": 0,
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
      "react-hooks/rules-of-hooks": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-refresh/only-export-components": [
        "off",
        { allowConstantExport: true },
      ],
      "simple-import-sort/imports": [
        "off",
        { groups: [["^\\u0000"], ["^@?\\w"], ["^@src", "^@shared"], ["^\\."]] },
      ],
      "simple-import-sort/exports": "off",
      "sort-imports": "off",
      "import/order": "off",
      "@tanstack/query/exhaustive-deps": "off",
      "@tanstack/query/no-deprecated-options": "off",
      "@tanstack/query/prefer-query-object-syntax": "off",
      "@tanstack/query/stable-query-client": "error",
    },
  },

  globalIgnores([
    "eslint.config.cjs",
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/.next/**",
    "**/coverage/**",
    "**/.turbo/**",
    "**/.cache/**",
    "**/out/**",
    "**/.output/**",
    "**/*.min.js",
  ]),
]);
