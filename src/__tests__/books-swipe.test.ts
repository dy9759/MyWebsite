import { describe, expect, it } from "vitest";
import { swipeDirection } from "@/lib/books/swipe";

const at = (x: number, y: number, t = 0) => ({ x, y, t });

describe("swipeDirection", () => {
  it("detects a quick horizontal swipe", () => {
    expect(swipeDirection(at(300, 200), at(150, 210, 200))).toBe("left");
    expect(swipeDirection(at(100, 200), at(260, 190, 200))).toBe("right");
  });

  it("ignores short moves and taps", () => {
    expect(swipeDirection(at(100, 100), at(130, 100, 100))).toBeNull();
  });

  it("ignores mostly vertical drags (scrolling a fit-width page)", () => {
    expect(swipeDirection(at(100, 400), at(160, 100, 200))).toBeNull();
  });

  it("ignores slow drags", () => {
    expect(swipeDirection(at(300, 200), at(100, 200, 1500))).toBeNull();
  });
});
