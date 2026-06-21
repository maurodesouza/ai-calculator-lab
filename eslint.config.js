import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "dist-ssr/**",
      ".tanstack/**",
      "node_modules/**",
      "src/routeTree.gen.ts",
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  importPlugin.flatConfigs.recommended,
  {
    plugins: {
      "react-hooks": reactHooks,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: "readonly",
        document: "readonly",
        window: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "prettier/prettier": "error",
      ...prettier.rules,
      ...reactHooks.configs.recommended.rules,
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "function-declaration",
          unnamedComponents: "arrow-function",
        },
      ],
      "func-style": ["error", "declaration", { allowArrowFunctions: true }],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "import/no-default-export": "error",
      "import/no-unresolved": "off",
      "import/named": "off",
    },
  },
  {
    files: ["src/router.tsx", "**/*.d.ts"],
    rules: {
      "@typescript-eslint/consistent-type-definitions": "off",
    },
  },
  {
    files: ["vite.config.ts", "eslint.config.js"],
    rules: {
      "import/no-default-export": "off",
    },
  },
  {
    files: ["src/events/index.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
);
