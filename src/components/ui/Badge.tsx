// Badge Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type BadgeVariant = "default" | "accent" | "muted" | "outline";
type BadgeSize = "xs" | "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[var(--color-background)] text-[var(--color-muted)]",
  accent: "bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
  muted: "bg-[var(--color-card)] text-[var(--color-muted)]",
  outline: "border border-[var(--color-border)] text-[var(--color-muted)]",
};

const sizeStyles: Record<BadgeSize, string> = {
  xs: "px-2 py-0.5 text-[10px]",
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1 text-sm",
};

export function Badge({
  variant = "default",
  size = "sm",
  children,
  className = "",
}: BadgeProps) {
  const classes = `inline-block rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  return <span className={classes}>{children}</span>;
}


// Section Label Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export function SectionLabel({
  children,
  className = "",
  centered = true,
}: SectionLabelProps) {
  const centerClass = centered ? "text-center" : "";
  return (
    <p className={`text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-4 ${centerClass} ${className}`}>
      {children}
    </p>
  );
}


// Tag Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className = "" }: TagProps) {
  return (
    <span className={`text-xs px-2 py-1 rounded-full bg-[var(--color-background)] text-[var(--color-muted)] ${className}`}>
      {children}
    </span>
  );
}


// Hero Badge Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface HeroBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function HeroBadge({ children, className = "" }: HeroBadgeProps) {
  return (
    <span className={`inline-block mb-4 px-4 py-1 rounded-full bg-[var(--color-brand-cyan)]/10 text-[var(--color-brand-cyan)] text-sm font-medium ${className}`}>
      {children}
    </span>
  );
}
