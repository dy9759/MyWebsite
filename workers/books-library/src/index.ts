import { verifyAccessJwt } from "./access";

// Private book library: lists and serves the owner's e-books from R2 to the
// site's shelf (fetch with credentials from chauncey.myoii.com). Every
// request must carry a valid Cloudflare Access token for this application.

type Env = {
  BOOKS: R2Bucket;
  TEAM_DOMAIN: string;
  ACCESS_AUD: string;
  ALLOWED_ORIGINS: string;
  HOME_URL: string;
};

const EXT = /\.(epub|pdf|mobi|azw3?|prc|fb2|fbz|cbz|txt|md|markdown|rtf)$/i;

let certs: { at: number; keys: JsonWebKey[] } | null = null;
async function accessKeys(team: string): Promise<JsonWebKey[]> {
  if (certs && Date.now() - certs.at < 3600_000) return certs.keys;
  const res = await fetch(`https://${team}/cdn-cgi/access/certs`);
  const { keys } = (await res.json()) as { keys: JsonWebKey[] };
  certs = { at: Date.now(), keys };
  return keys;
}

const cookie = (req: Request, name: string) =>
  req.headers.get("Cookie")?.split(/;\s*/).find((c) => c.startsWith(`${name}=`))?.slice(name.length + 1) ?? null;

async function signedIn(req: Request, env: Env): Promise<boolean> {
  const token = req.headers.get("Cf-Access-Jwt-Assertion") ?? cookie(req, "CF_Authorization");
  if (!token) return false;
  return (await verifyAccessJwt(token, await accessKeys(env.TEAM_DOMAIN), env.TEAM_DOMAIN, env.ACCESS_AUD)) !== null;
}

function corsHeaders(req: Request, env: Env): Record<string, string> {
  const origin = req.headers.get("Origin");
  const allowed = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim());
  if (!origin || !allowed.includes(origin)) return {};
  return { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Credentials": "true", Vary: "Origin" };
}

const worker = {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    const cors = corsHeaders(req, env);
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: { ...cors, "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Max-Age": "86400" } });
    }
    if (req.method !== "GET") return new Response("method not allowed", { status: 405, headers: cors });
    if (!(await signedIn(req, env))) return new Response("unauthorized", { status: 401, headers: cors });

    if (url.pathname === "/login") {
      // Access has just signed the owner in; send them back to the shelf.
      return Response.redirect(env.HOME_URL, 302);
    }
    if (url.pathname === "/list") {
      const books: { name: string; size: number }[] = [];
      let cursor: string | undefined;
      do {
        const page = await env.BOOKS.list({ cursor, limit: 1000 });
        for (const o of page.objects) if (EXT.test(o.key)) books.push({ name: o.key, size: o.size });
        cursor = page.truncated ? page.cursor : undefined;
      } while (cursor);
      return Response.json(books, { headers: { ...cors, "Cache-Control": "no-store" } });
    }
    if (url.pathname.startsWith("/file/")) {
      const name = decodeURIComponent(url.pathname.slice("/file/".length));
      const obj = EXT.test(name) ? await env.BOOKS.get(name) : null;
      if (!obj) return new Response("not found", { status: 404, headers: cors });
      return new Response(obj.body, {
        headers: { ...cors, "Content-Type": "application/octet-stream", "Content-Length": String(obj.size), "Cache-Control": "private, no-store" },
      });
    }
    return new Response("not found", { status: 404, headers: cors });
  },
};

export default worker;
