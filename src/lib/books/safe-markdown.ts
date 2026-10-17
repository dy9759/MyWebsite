import { Marked } from "marked";

// Markdown renderer for model output. Model answers can echo text from an
// untrusted e-book, so raw HTML is escaped and only http(s) links survive.
const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const safe = new Marked({
  gfm: true,
  breaks: true,
  renderer: {
    html: ({ text }) => escape(text),
    link({ href, tokens }) {
      const label = this.parser.parseInline(tokens);
      return /^https?:\/\//i.test(href)
        ? `<a href="${escape(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`
        : label;
    },
    image: ({ text }) => escape(text),
  },
});

export const renderSafeMarkdown = (md: string) => safe.parse(md, { async: false });
