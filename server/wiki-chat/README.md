# AI Sense Wiki — chat backend

A tiny standalone service that powers the Wiki's 随行 chat. It is **not** part of
the static site (GitHub Pages has no server runtime) — run/deploy it separately
and point the frontend at it.

```
frontend (static site)  --POST /chat-->  this service  --Anthropic API-->  百炼 → deepseek-v4-flash-0731
```

## Run locally

```bash
cd server/wiki-chat
cp .env.example .env      # then edit .env, set ANTHROPIC_API_KEY (a freshly rotated key)
npm install
npm run dev               # http://localhost:8787
```

Point the site at it (site repo root):

```bash
NEXT_PUBLIC_WIKI_API_URL=http://localhost:8787/chat npm run dev
```

With no `NEXT_PUBLIC_WIKI_API_URL`, the chat stays in preset demo mode.

## API

- `GET /health` → `{ ok, model }`
- `POST /chat` body `{ "message": "..." }` → `{ "grounded": "...", "text": "...", "cites": [["tag","name"], ...] }`

## Deploy

Any Node host works (a small VM, Fly.io, Render, Railway, a container). Set the
env vars from `.env.example`, then set the site build's
`NEXT_PUBLIC_WIKI_API_URL` to the deployed `…/chat` URL and rebuild the site.

## Security (must)

- **Key is server-side only.** It lives in this service's env, never in the
  frontend bundle or git. The static site is fully public.
- **Rotate the exposed keys.** The keys pasted earlier in chat (`sk-b70852…`,
  `sk-ws-H.EP…`) are compromised — revoke and regenerate; put the new one only
  in `.env` here.
- **Restrict CORS** in production: set `WIKI_ALLOWED_ORIGINS` to your site's
  origin(s), not `*`.
- Consider adding rate limiting / an allowlist before exposing publicly.

## Notes

- v1 grounds answers on a static knowledge summary (`knowledge.js`). v2 can
  swap in real retrieval (RAG) over the full source / term / course / job data.
- Verify Bailian's exact Anthropic-compatible path for your account; adjust
  `ANTHROPIC_BASE_URL` if needed. This service uses the official
  `@anthropic-ai/sdk` against that base URL.
