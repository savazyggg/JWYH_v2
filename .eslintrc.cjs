module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react-refresh", "react-hooks", "prettier"],
  rules: {
    "prettier/prettier": "warn",
    "react-refresh/only-export-components": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "(useRecoilCallback|useRecoilTransaction_UNSTABLE)",
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "styled-components",
            message: "Please import from styled-components/macro.",
          },
        ],
        patterns: ["!styled-components/macro"],
      },
    ],
  },
};
