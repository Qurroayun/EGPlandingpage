// eslint.config.mjs
import js from "@eslint/js";
import eslintPluginNext from "@next/eslint-plugin-next"; // ✅ gunakan default import
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["node_modules/**", ".next/**", "src/generated/**", "prisma/**"], // ✅ ignore yang tepat
  },
  js.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      "@typescript-eslint": ts,
    },
    rules: {
      // kamu bisa tambahkan rule custom di sini jika mau
    },
  },
  eslintPluginNext, // ✅ tidak destructuring
];
