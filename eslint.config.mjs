import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  globalIgnores([".next/**", "node_modules/**", "public/**"]),
  ...nextVitals,
  {
    rules: {
      "prefer-const": "error",
      "no-unused-vars": "off",
      "@next/next/no-img-element": "warn",
    },
  },
]);
