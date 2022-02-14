module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "next",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "testing-library"],
  rules: {
    "no-console": 1,
    "react-hooks/exhaustive-deps": 0,
  },
  overrides: [
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

      // Use Testing Library lint rules in test files
      extends: ["plugin:testing-library/react"],

      // This rule isn't aware of Jest's resolvers, so it may not always be correct
      rules: {
        "import/no-unresolved": "off",
      },
    },
  ],
};
