// Companion chat state shared by the /wiki page and the lesson tutor: one
// conversation, one in-flight request at a time (a second send while a reply
// is pending is ignored, so chips / "问这句" can't interleave replies).
import { useCallback, useRef, useState } from "react";
import type { WikiMsg } from "@/components/wiki/wiki-chat";
import { askWiki } from "@/lib/wiki-data";

export function useWikiChat(language: "zh" | "en", initial: WikiMsg[] = []) {
  const [convo, setConvo] = useState<WikiMsg[]>(initial);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const busy = useRef(false);

  const send = useCallback(
    async (q: string) => {
      if (busy.current) return;
      busy.current = true;
      setOpen(true);
      setConvo((prev) => [...prev, { role: "u", text: q }]);
      setPending(true);
      try {
        const data = await askWiki(q, language); // backend → visitor key → demo
        setConvo((prev) => [...prev, { role: "a", data }]);
      } finally {
        busy.current = false;
        setPending(false);
      }
    },
    [language],
  );

  return { convo, open, setOpen, pending, send };
}
