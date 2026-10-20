// Personal book library server: serves e-books from a folder on THIS
// computer to the site's local shelf (which stores them in the browser).
// It listens on 127.0.0.1 only, so nothing is reachable from other
// machines, and the books never enter the repo or the deployed site.
//
//   npm run books:serve -- ~/Books        (default folder: ~/Books)
import { createServer } from "node:http";
import { createReadStream, readdirSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { basename, join, resolve } from "node:path";

const DIR = resolve((process.argv[2] ?? join(homedir(), "Books")).replace(/^~(?=$|\/)/, homedir()));
const PORT = Number(process.env.BOOKS_PORT ?? 8789);
try {
  if (!statSync(DIR).isDirectory()) throw new Error();
} catch {
  console.error(`Not a folder: ${DIR}\nUsage: npm run books:serve -- <folder with your e-books>`);
  process.exit(1);
}
const EXT = /\.(epub|pdf|mobi|azw3?|prc|fb2|fbz|cbz|txt|md|markdown|rtf)$/i;
const ORIGINS = new Set(["http://localhost:3000", "http://127.0.0.1:3000", "https://chauncey.myoii.com"]);

const list = () =>
  readdirSync(DIR)
    .filter((n) => EXT.test(n) && !n.startsWith("."))
    .map((name) => ({ name, size: statSync(join(DIR, name)).size }));

createServer((req, res) => {
  const origin = req.headers.origin ?? "";
  if (ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    // Lets the https site reach this loopback server (Private Network Access).
    res.setHeader("Access-Control-Allow-Private-Network", "true");
  } else if (origin) {
    res.writeHead(403).end();
    return;
  }
  if (req.method === "OPTIONS") return res.writeHead(204).end();
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  if (url.pathname === "/list") {
    res.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify(list()));
    return;
  }
  if (url.pathname.startsWith("/file/")) {
    const name = basename(decodeURIComponent(url.pathname.slice(6))); // no path traversal
    if (!EXT.test(name) || !list().some((b) => b.name === name)) return res.writeHead(404).end();
    res.writeHead(200, { "content-type": "application/octet-stream" });
    createReadStream(join(DIR, name)).pipe(res);
    return;
  }
  res.writeHead(404).end();
}).listen(PORT, "127.0.0.1", () => {
  console.log(`Book library: ${DIR} (${list().length} books) on http://127.0.0.1:${PORT}`);
  console.log("Open the site's 读书 page → 我的书架 to import them. Ctrl-C to stop.");
});
