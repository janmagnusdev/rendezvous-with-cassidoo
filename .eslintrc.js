/** @type {import('eslint').Linter.Config} */
const config = {
  env: {
    es2021: true,
    jest: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier", "plugin:import/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      node: true,
      typescript: true,
    },
    jest: {
      version: 29,
    },
  },
};

// eslint-disable-next-line import/no-commonjs
module.exports = config;
