// @vitest-environment node
import { describe, expect, it } from "vitest";
import { checkClaims, verifyAccessJwt } from "../../workers/books-library/src/access";

const TEAM = "team.cloudflareaccess.com";
const AUD = "aud-123";
const b64url = (b: ArrayBuffer | Uint8Array) => Buffer.from(b instanceof Uint8Array ? b : new Uint8Array(b)).toString("base64url");

async function makeToken(claims: Record<string, unknown>, kid = "k1") {
  const pair = await crypto.subtle.generateKey(
    { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
    true,
    ["sign", "verify"],
  );
  const h = b64url(new TextEncoder().encode(JSON.stringify({ alg: "RS256", kid })));
  const p = b64url(new TextEncoder().encode(JSON.stringify(claims)));
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", pair.privateKey, new TextEncoder().encode(`${h}.${p}`));
  const jwk = { ...(await crypto.subtle.exportKey("jwk", pair.publicKey)), kid };
  return { token: `${h}.${p}.${b64url(sig)}`, keys: [jwk] };
}

const now = 1_800_000_000;
const good = { aud: [AUD], iss: `https://${TEAM}`, exp: now + 600, email: "me@example.com" };

describe("books library Access check", () => {
  it("accepts a valid token", async () => {
    const { token, keys } = await makeToken(good);
    expect((await verifyAccessJwt(token, keys, TEAM, AUD, now))?.email).toBe("me@example.com");
  });

  it("rejects wrong audience, issuer, expiry or a tampered token", async () => {
    expect(checkClaims({ ...good, aud: ["other"] }, TEAM, AUD, now)).toBe("audience");
    expect(checkClaims({ ...good, iss: "https://evil" }, TEAM, AUD, now)).toBe("issuer");
    expect(checkClaims({ ...good, exp: now - 1 }, TEAM, AUD, now)).toBe("expired");
    const { token, keys } = await makeToken(good);
    const [h, , s] = token.split(".");
    const forged = `${h}.${b64url(new TextEncoder().encode(JSON.stringify({ ...good, email: "x@y" })))}.${s}`;
    expect(await verifyAccessJwt(forged, keys, TEAM, AUD, now)).toBeNull();
    expect(await verifyAccessJwt(token, [{ ...keys[0], kid: "other" }], TEAM, AUD, now)).toBeNull();
  });
});
