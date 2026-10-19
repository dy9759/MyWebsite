import { useCallback, useEffect, useRef, useState } from "react";

// Reader fullscreen: the element Fullscreen API where it works, otherwise
// (iPhone Safari, in-app webviews that never settle the request) a CSS mode
// where the reader simply covers the viewport.
export function useFullscreen() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [nativeFull, setNativeFull] = useState(false);
  const [cssFull, setCssFull] = useState(false);

  const toggle = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else if (cssFull) {
      setCssFull(false);
    } else if (document.fullscreenEnabled && rootRef.current?.requestFullscreen) {
      const fallback = setTimeout(() => {
        if (!document.fullscreenElement) setCssFull(true);
      }, 800);
      rootRef.current
        .requestFullscreen()
        .then(() => clearTimeout(fallback))
        .catch(() => {
          clearTimeout(fallback);
          setCssFull(true);
        });
    } else {
      setCssFull(true);
    }
  }, [cssFull]);

  useEffect(() => {
    const onFsChange = () => {
      const active = document.fullscreenElement === rootRef.current;
      setNativeFull(active);
      if (active) setCssFull(false);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const exitCss = useCallback(() => setCssFull(false), []);
  return { rootRef, fullscreen: nativeFull || cssFull, toggle, exitCss };
}
