import { describe, expect, it } from "vitest";
import { bookIdFor } from "@/lib/books/store";

describe("bookIdFor", () => {
  it("is stable for identical content and differs otherwise", async () => {
    const a = await bookIdFor(new Blob(["same bytes"]));
    expect(a).toMatch(/^[0-9a-f]{32}$/);
    expect(await bookIdFor(new Blob(["same bytes"]))).toBe(a);
    expect(await bookIdFor(new Blob(["other bytes"]))).not.toBe(a);
  });
});
