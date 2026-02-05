// Gradient Text Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3";
}

export function GradientText({
  children,
  className = "",
  as: Component = "span",
}: GradientTextProps) {
  return (
    <Component className={`bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] bg-clip-text text-transparent ${className}`}>
      {children}
    </Component>
  );
}


// Muted Text Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export function MutedText({ children, className = "" }: TextProps) {
  return <p className={`text-[var(--color-muted)] ${className}`}>{children}</p>;
}


// Card Title Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function CardTitle({ children, className = "" }: TextProps) {
  return (
    <h3 className={`text-lg font-medium text-[var(--color-foreground)] ${className}`}>
      {children}
    </h3>
  );
}


// Card Description Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function CardDescription({ children, className = "" }: TextProps) {
  return (
    <p className={`text-sm text-[var(--color-muted)] leading-relaxed ${className}`}>
      {children}
    </p>
  );
}
