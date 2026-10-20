import { BILINGUAL_CSS } from "@/lib/books/bilingual";

// Styles injected into foliate's section iframes (reflowable books only).
export const readerCss = (dark: boolean, fontSize: number) => `
  html { color-scheme: ${dark ? "dark" : "light"}; font-size: ${fontSize}% !important; }
  html, body { background: transparent !important; color: ${dark ? "#e5e5e5" : "#1a1a1a"} !important; }
  p, li, blockquote { line-height: 1.8; }
  a:link { color: ${dark ? "#8ab4f8" : "#1a56db"}; }
  img, svg { max-width: 100%; height: auto; }
  pre { white-space: pre-wrap; }
${BILINGUAL_CSS}`;
