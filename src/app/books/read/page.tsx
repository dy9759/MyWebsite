import type { Metadata } from "next";
import { Suspense } from "react";
import BookReader from "@/components/books/book-reader";

export const metadata: Metadata = {
  title: "阅读器",
  robots: { index: false },
};

// The book id is a query param (?id=) because books live in the visitor's
// IndexedDB, so there is nothing to pre-render per book in a static export.
export default function ReadPage() {
  return (
    <Suspense>
      <BookReader />
    </Suspense>
  );
}
