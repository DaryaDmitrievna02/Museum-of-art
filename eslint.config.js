import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": 0,
    },
  },

  {
    ignores: [
      "!node_modules/",
      "node_modules/*",
      "!node_modules/mylibrary/",
      "dist/**/*",
      "**/__mocks__",
      "commitlint.config.ts",
    ],
  },
];

