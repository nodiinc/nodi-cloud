"use client";

import { useState } from "react";


// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface ComponentPreviewProps {
  name: string;
  description?: string;
  children: React.ReactNode;
  code?: string;
}

interface DocSectionDividerProps {
  title: string;
  topHref?: string;
}

interface DocTableOfContentsProps {
  title: string;
  items: string[];
}


// ComponentPreview
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function ComponentPreview({ name, description, children, code }: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false);
  const id = name.toLowerCase().replace(/[^a-z]/g, "");

  return (
    <div
      id={id}
      className="mb-12 border border-[var(--color-border)] rounded-xl overflow-hidden scroll-mt-32"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-card)]">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-foreground)] font-mono">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-[var(--color-muted)] mt-1">{description}</p>
          )}
        </div>
        {code && (
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-xs px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:border-[var(--color-accent)] transition-colors"
          >
            {showCode ? "Hide Code" : "Show Code"}
          </button>
        )}
      </div>

      {/* Preview */}
      <div className="p-6 bg-[var(--color-background)]">
        {children}
      </div>

      {/* Code */}
      {showCode && code && (
        <div className="border-t border-[var(--color-border)] bg-[#1a1a1a] p-4 overflow-x-auto">
          <pre className="text-xs text-[var(--color-muted)] font-mono whitespace-pre-wrap">
            {code}
          </pre>
        </div>
      )}
    </div>
  );
}


// DocSectionDivider
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function DocSectionDivider({ title, topHref = "#top" }: DocSectionDividerProps) {
  const id = title.toLowerCase().replace(/[^a-z]/g, "");

  return (
    <div
      id={`section-${id}`}
      className="sticky top-[64px] z-20 -mx-6 px-6 pt-8 pb-4 bg-[var(--color-background)] border-b border-[var(--color-border)]"
    >
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-[var(--color-foreground)]">{title}</h2>
        <div className="flex-1 h-px bg-[var(--color-border)]" />
        <a
          href={topHref}
          className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
        >
          ↑ Top
        </a>
      </div>
    </div>
  );
}


// DocTableOfContents
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function DocTableOfContents({ title, items }: DocTableOfContentsProps) {
  return (
    <div className="mb-12 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-card-hover)]">
        <h2 className="text-sm font-semibold text-[var(--color-foreground)] uppercase tracking-wider">
          {title}
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2 text-sm">
          {items.map((name) => (
            <a
              key={name}
              href={`#${name.toLowerCase().replace(/[^a-z]/g, "")}`}
              className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors font-mono py-1"
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
