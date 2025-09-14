import js from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      // spacing
      "@stylistic/indent": ["warn", 2],
      "@stylistic/space-before-blocks": ["warn", "always"],
      "@stylistic/keyword-spacing": ["warn", { before: true, after: true }],

      // semicolons
      "@stylistic/semi": ["warn", "always"],

      // quotes
      "@stylistic/quotes": ["warn", "double"],

      // no unused vars (already works)
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/no-explicit-any": ["off"],

      // line length
      "@stylistic/max-len": [
        "warn",
        {
          code: 100,          // max characters per line
          tabWidth: 2,        // how tabs are counted
          ignoreUrls: true,   // don’t break on long URLs
          ignoreStrings: true, // don’t break long strings
          ignoreTemplateLiterals: true,
          ignoreComments: true,
        },
      ],
    },
  }
);
