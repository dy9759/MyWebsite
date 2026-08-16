import { describe, expect, it } from "vitest";
import { SITE_COPY } from "@/components/language-provider";

// SITE_COPY.zh / .en are independent object literals with no shared type
// enforcing the same shape. A key added to one language but not the other
// yields `undefined` at runtime for the missing language. This guards the
// two blocks against structural drift.
function keyPaths(value: unknown, prefix = ""): string[] {
  if (!value || typeof value !== "object") return [prefix];
  return Object.entries(value as Record<string, unknown>).flatMap(
    ([key, child]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return keyPaths(child, path);
    },
  );
}

describe("SITE_COPY zh/en parity", () => {
  it("keeps identical key structure across languages", () => {
    const zh = keyPaths(SITE_COPY.zh).sort();
    const en = keyPaths(SITE_COPY.en).sort();
    expect(en).toEqual(zh);
  });
});
