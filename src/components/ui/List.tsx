// Bullet List Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface BulletListProps {
  items: string[];
  className?: string;
}

export function BulletList({ items, className = "" }: BulletListProps) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
          <span className="text-[var(--color-accent)] mt-0.5">•</span>
          {item}
        </li>
      ))}
    </ul>
  );
}


// Check List Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface CheckListProps {
  items: string[];
  className?: string;
  columns?: 1 | 2;
}

export function CheckList({
  items,
  className = "",
  columns = 1,
}: CheckListProps) {
  const colClass = columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1";
  return (
    <div className={`grid gap-2 ${colClass} ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
          <svg
            className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {item}
        </div>
      ))}
    </div>
  );
}


// Dot List Component (for features in cards)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface DotListItem {
  name: string;
  desc?: string;
}

interface DotListProps {
  items: DotListItem[];
  className?: string;
}

export function DotList({ items, className = "" }: DotListProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <div key={item.name} className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 flex-shrink-0" />
          <div>
            <div className="text-sm font-medium text-[var(--color-foreground)]">{item.name}</div>
            {item.desc && <div className="text-xs text-[var(--color-muted)]">{item.desc}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
