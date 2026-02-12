import antfu from "@antfu/eslint-config";

export default antfu({
  type: "app",
  formatters: true,
  typescript: true,
  react: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
  ignores: [
    "./src/routeTree.gen.ts",
  ],
}, {
  rules: {
    "perfectionist/sort-imports": ["error", {
      tsconfig: {
        rootDir: ".",
      },
    }],
    "unicorn/prefer-type-error": ["off"],
    "ts/consistent-type-definitions": ["off"],
    "unicorn/filename-case": ["error", {
      case: "kebabCase",
      ignore: ["README.md"],
    }],
    "react-refresh/only-export-components": ["off"],
    "react/no-use-context": ["off"],
    "react/no-context-provider": ["off"],
    "react/no-array-index-key": ["off"],
  },
});
