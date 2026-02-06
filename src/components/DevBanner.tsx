"use client";

import { useState, useEffect } from "react";

export default function DevBanner() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => setVisible(false), 600);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-600 ${
        fading ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="px-8 py-4 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-4">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-cyan)] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-brand-cyan)]" />
        </span>
        <span className="text-base text-[var(--color-muted)]">
          이 사이트는 현재 <span className="text-[var(--color-foreground)] font-semibold">개발 중</span>입니다
        </span>
      </div>
    </div>
  );
}
