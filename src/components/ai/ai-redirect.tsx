"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AIRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/wiki");
  }, [router]);
  return (
    <p className="px-4 py-10 text-sm text-muted-foreground">
      AI Sense Sources 已整合进{" "}
      <Link href="/wiki" className="text-accent underline">
        AI Sense Wiki · AI 知识源
      </Link>
      ，正在跳转…
    </p>
  );
}
