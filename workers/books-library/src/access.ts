// Verifies a Cloudflare Access JWT (RS256) against the team's public keys:
// signature, audience, issuer and expiry. Pure WebCrypto, no dependencies.

type Jwk = JsonWebKey & { kid?: string };
type Claims = { aud?: string | string[]; iss?: string; exp?: number; nbf?: number; email?: string };

const b64urlBytes = (s: string) => {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};
const b64urlJson = <T>(s: string): T => JSON.parse(new TextDecoder().decode(b64urlBytes(s))) as T;

export function checkClaims(claims: Claims, teamDomain: string, aud: string, nowSec: number): string | null {
  const auds = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  if (!auds.includes(aud)) return "audience";
  if (claims.iss !== `https://${teamDomain}`) return "issuer";
  if (!claims.exp || claims.exp < nowSec) return "expired";
  if (claims.nbf && claims.nbf > nowSec + 60) return "not yet valid";
  return null;
}

export async function verifyAccessJwt(
  token: string,
  keys: Jwk[],
  teamDomain: string,
  aud: string,
  nowSec = Math.floor(Date.now() / 1000),
): Promise<Claims | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [h, p, sig] = parts;
  let header: { alg?: string; kid?: string };
  let claims: Claims;
  try {
    header = b64urlJson(h);
    claims = b64urlJson(p);
  } catch {
    return null;
  }
  if (header.alg !== "RS256") return null;
  const jwk = keys.find((k) => k.kid === header.kid);
  if (!jwk) return null;
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64urlBytes(sig), new TextEncoder().encode(`${h}.${p}`));
  if (!ok || checkClaims(claims, teamDomain, aud, nowSec)) return null;
  return claims;
}
