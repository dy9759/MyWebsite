# books-ai-proxy

Cloudflare Worker that lets visitors use the site's reading AI features
(companion, translation, bilingual view, book advisor) without bringing their
own key. The Bailian key lives only in this Worker's encrypted secrets.

```
browser (no key) ──POST /chat──► Worker ──► Bailian (OpenAI-compatible, streamed)
                                  │ origin allowlist, per-IP + site-wide daily limits
                                  └ fixed models, capped input/output, thinking off
```

Visitors who add their own key in the AI panel bypass the proxy and call
Bailian directly, as before.

## One-time setup

1. **Bailian key** — create a dedicated sub-account key with a spending cap
   in the Bailian console (the proxy limits requests, the cap limits money).
2. **Cloudflare API token** — dash.cloudflare.com → My Profile → API Tokens →
   *Edit Cloudflare Workers* template. Note your Account ID (Workers overview).
3. **GitHub repository secrets** (Settings → Secrets and variables → Actions):
   `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `BAILIAN_API_KEY`.
4. Run the **Deploy AI proxy** workflow (Actions tab → Run workflow). It
   deploys the Worker and stores `BAILIAN_API_KEY` as a Worker secret.
5. Copy the Worker URL from the workflow log (e.g.
   `https://books-ai-proxy.<subdomain>.workers.dev`) and add a repository
   **variable** `AI_PROXY_URL` = that URL + `/chat`. The next site deploy
   picks it up (`NEXT_PUBLIC_AI_PROXY_URL`).
6. Check: `curl https://books-ai-proxy.<subdomain>.workers.dev/health`.

## Limits and settings

All in `wrangler.toml` `[vars]`; change and push (the workflow redeploys):

| var | default | meaning |
|---|---|---|
| `ALLOWED_ORIGINS` | site + localhost:3000 | CORS allowlist |
| `MODELS` | `deepseek-v4.1-flash-1017,qwen-plus` | allowed models, first = default |
| `MAX_TOKENS` | 2048 | output cap per request |
| `MAX_INPUT_CHARS` | 60000 | input cap per request |
| `DAILY_LIMIT` | 500 | requests per UTC day, whole site |
| `IP_DAILY_LIMIT` | 120 | requests per UTC day, per IP |
| `IP_MINUTE_LIMIT` | 15 | requests per minute, per IP |

Counters live in one Durable Object (`Limiter`), so limits are exact. Over a
limit the proxy answers 429 and the site suggests adding an own key.

Origin checks only stop other websites' pages; scripts can fake the header.
The per-IP and daily limits plus the Bailian spending cap bound the cost.

## Local development

```bash
cd workers/ai-proxy
npm ci
echo 'BAILIAN_API_KEY=sk-…' > .dev.vars   # gitignored
npx wrangler dev                         # http://localhost:8787/chat
```

Then run the site with `NEXT_PUBLIC_AI_PROXY_URL=http://localhost:8787/chat`.
