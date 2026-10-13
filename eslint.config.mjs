import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      "react/jsx-no-target-blank": [
        "error",
        { enforceDynamicLinks: "always" },
      ],
    },
  },
  // .claude/ holds agent worktrees (full repo copies) — never lint them.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", ".claude/**"]),
]);
