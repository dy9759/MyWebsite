# books-library

The site owner's private e-book library: a private R2 bucket served on
`books.myoii.com`, behind a Cloudflare Access application that lets only the
owner's email sign in. The Worker re-checks the Access token (signature,
audience, issuer, expiry) on every request. Books never enter this repo or the
static site; the site's shelf imports them into the browser (IndexedDB).

```
shelf (chauncey.myoii.com, fetch with credentials)
  → books.myoii.com  (Cloudflare Access: owner only)
  → this Worker: GET /list, GET /file/<name>, GET /login
  → R2 bucket books-private
```

## Use

1. On each device, open `https://books.myoii.com/login` once and sign in with
   the emailed one-time code; you land back on the 读书 page's shelf.
2. The shelf shows 「云书库：N 本 · 全部导入」.
3. Add books by uploading them to the `books-private` bucket in the
   Cloudflare dashboard.

## Setup (done once)

- R2 bucket `books-private`, public access off.
- Zero Trust team `gentle-bush-4578`; Access application on
  `books.myoii.com` with an Allow policy for the owner's email, CORS allowing
  credentials from `https://chauncey.myoii.com`, OPTIONS bypassed to origin.
- `TEAM_DOMAIN` and `ACCESS_AUD` in `wrangler.toml` match that application.
- The deploy token needs `Workers R2 Storage: Edit`.
- Deployed by `.github/workflows/books-library.yml` on push.
