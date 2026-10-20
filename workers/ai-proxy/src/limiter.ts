import { DurableObject } from "cloudflare:workers";
import { utcDay, utcMinute } from "./policy";

// One global Durable Object keeps the counters, so limits are exact (KV is
// eventually consistent and would let bursts through). Daily counters live
// in storage; the per-minute window lives in memory — if the object is
// evicted it simply restarts that minute, which is harmless.

export type Limits = { daily: number; ipDaily: number; ipMinute: number };
export type Verdict = { ok: true } | { ok: false; reason: "site-daily" | "ip-daily" | "ip-minute" };

export class Limiter extends DurableObject {
  private minute = "";
  private perMinute = new Map<string, number>();

  async take(ip: string, limits: Limits): Promise<Verdict> {
    const now = new Date();
    const day = utcDay(now);
    const min = utcMinute(now);
    if (min !== this.minute) {
      this.minute = min;
      this.perMinute.clear();
    }
    if ((this.perMinute.get(ip) ?? 0) >= limits.ipMinute) return { ok: false, reason: "ip-minute" };

    const siteKey = `site:${day}`;
    const ipKey = `ip:${day}:${ip}`;
    const [site, mine] = await Promise.all([
      this.ctx.storage.get<number>(siteKey),
      this.ctx.storage.get<number>(ipKey),
    ]);
    if ((site ?? 0) >= limits.daily) return { ok: false, reason: "site-daily" };
    if ((mine ?? 0) >= limits.ipDaily) return { ok: false, reason: "ip-daily" };

    this.perMinute.set(ip, (this.perMinute.get(ip) ?? 0) + 1);
    await this.ctx.storage.put({ [siteKey]: (site ?? 0) + 1, [ipKey]: (mine ?? 0) + 1 });
    if (site === undefined) await this.prune(day); // first request of a new day
    return { ok: true };
  }

  // Drops counters from earlier days so storage does not grow forever.
  private async prune(today: string) {
    const old = await this.ctx.storage.list({ limit: 1000 });
    const stale = [...old.keys()].filter((k) => !k.includes(`:${today}`));
    for (let i = 0; i < stale.length; i += 128) await this.ctx.storage.delete(stale.slice(i, i + 128));
  }
}
