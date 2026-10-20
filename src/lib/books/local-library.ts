// Book libraries the owner can import from into the browser shelf:
// - local: scripts/books-server.mjs on 127.0.0.1 (only on that computer);
// - cloud: workers/books-library on books.myoii.com, behind Cloudflare
//   Access (only the owner's email; sign in once per device at /login).
// For anyone else both probes fail and the shelf shows nothing extra.
export type LibrarySource = { id: "local" | "cloud"; label: string; url: string; credentials: RequestCredentials };

export const LIBRARIES: LibrarySource[] = [
  { id: "cloud", label: "云书库", url: "https://books.myoii.com", credentials: "include" },
  { id: "local", label: "本机书库", url: "http://127.0.0.1:8789", credentials: "omit" },
];

export type LibraryBook = { name: string; size: number };

export async function listLibrary(src: LibrarySource, timeoutMs = 3000): Promise<LibraryBook[] | null> {
  try {
    const res = await fetch(`${src.url}/list`, { credentials: src.credentials, signal: AbortSignal.timeout(timeoutMs) });
    return res.ok ? ((await res.json()) as LibraryBook[]) : null;
  } catch {
    return null;
  }
}

export async function fetchLibraryBook(src: LibrarySource, name: string): Promise<File> {
  const res = await fetch(`${src.url}/file/${encodeURIComponent(name)}`, { credentials: src.credentials });
  if (!res.ok) throw new Error(`${res.status}`);
  return new File([await res.blob()], name);
}
