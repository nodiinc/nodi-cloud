// Section Container
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  withBorder?: boolean;
}

export function Section({
  children,
  className = "",
  withBorder = false,
}: SectionProps) {
  const borderClass = withBorder ? "border-t border-[var(--color-border)]" : "";
  return (
    <section className={`py-24 px-6 ${borderClass} ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}


// Section Header
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeader({
  label,
  title,
  description,
  className = "",
  centered = true,
}: SectionHeaderProps) {
  const centerClass = centered ? "text-center" : "";
  return (
    <div className={`${centerClass} mb-16 ${className}`}>
      {label && (
        <p className="mb-4 text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider">
          {label}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-[var(--color-muted)]">
          {description}
        </p>
      )}
    </div>
  );
}


// Page Hero Section
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface PageHeroProps {
  label?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  minHeight?: string;
}

export function PageHero({
  label,
  title,
  description,
  children,
  className = "",
  minHeight = "min-h-[60vh]",
}: PageHeroProps) {
  return (
    <section className={`relative flex ${minHeight} flex-col items-center justify-center px-6 text-center ${className}`}>
      {/* Background effects */}
      <div className="pointer-events-none absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-[var(--color-brand-blue)]/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-[var(--color-brand-cyan)]/6 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        {label && (
          <p className="mb-4 text-base font-medium uppercase tracking-widest text-[var(--color-accent)]">
            {label}
          </p>
        )}
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[var(--color-foreground)] md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)] leading-relaxed">
            {description}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}


// Page Header (simpler, for detail pages)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({
  badge,
  title,
  description,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {badge && (
        <div className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
          {badge}
        </div>
      )}
      <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-5xl mb-6">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-[var(--color-muted)] max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
