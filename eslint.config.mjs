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
      // eslint-plugin-react-hooks v7 (via eslint-config-next 16) adds React
      // Compiler rules that the Next 14 config never ran. Off to keep the
      // pre-migration rule set; adopting them is a separate cleanup.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",
      "react-hooks/purity": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
