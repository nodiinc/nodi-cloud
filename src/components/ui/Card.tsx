import Link from "next/link";

// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type CardVariant = "default" | "hover" | "interactive";
type CardSize = "sm" | "md" | "lg";

interface CardProps {
  variant?: CardVariant;
  size?: CardSize;
  children: React.ReactNode;
  className?: string;
  href?: string;
}

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  href?: string;
}

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

interface CTACardProps {
  title: string;
  description: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}


// Styles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const variantStyles: Record<CardVariant, string> = {
  default: "border-[var(--color-border)]",
  hover: "border-[var(--color-border)] hover:border-[var(--color-brand-cyan)]/30 hover:bg-[var(--color-card-hover)]",
  interactive: "border-[var(--color-border)] hover:border-[var(--color-brand-cyan)]/50 hover:bg-[var(--color-card-hover)] cursor-pointer",
};

const sizeStyles: Record<CardSize, string> = {
  sm: "p-4 rounded-lg",
  md: "p-6 rounded-xl",
  lg: "p-8 rounded-2xl",
};

const baseStyles = "border bg-[var(--color-card)] transition-all";


// Base Card Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function Card({
  variant = "default",
  size = "md",
  children,
  className = "",
  href,
}: CardProps) {
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={`block ${combinedClassName}`}>
        {children}
      </Link>
    );
  }

  return <div className={combinedClassName}>{children}</div>;
}


// Feature Card Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FeatureCard({
  icon,
  title,
  description,
  className = "",
  href,
}: FeatureCardProps) {
  const content = (
    <>
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-lg font-medium text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
        {description}
      </p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`group block rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all hover:border-[var(--color-brand-cyan)]/30 hover:bg-[var(--color-card-hover)] ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={`group rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all hover:border-[var(--color-brand-cyan)]/30 hover:bg-[var(--color-card-hover)] ${className}`}
    >
      {content}
    </div>
  );
}


// Stat Card Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function StatCard({
  value,
  label,
  icon,
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`text-center p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] ${className}`}
    >
      {icon && (
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-3">
          {icon}
        </div>
      )}
      <div className="text-3xl font-bold text-[var(--color-foreground)] mb-1">
        {value}
      </div>
      <div className="text-sm text-[var(--color-muted)]">{label}</div>
    </div>
  );
}


// CTA Card Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function CTACard({
  title,
  description,
  children,
  className = "",
}: CTACardProps) {
  return (
    <div
      className={`text-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-12 ${className}`}
    >
      <h2 className="text-2xl font-semibold text-[var(--color-foreground)] mb-4">
        {title}
      </h2>
      <p className="text-[var(--color-muted)] mb-8 max-w-xl mx-auto">
        {description}
      </p>
      {children}
    </div>
  );
}


// Contact Card Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  className?: string;
}

export function ContactCard({
  icon,
  title,
  value,
  href,
  className = "",
}: ContactCardProps) {
  const content = (
    <>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-brand-blue)]/10 to-[var(--color-brand-cyan)]/10 text-[var(--color-accent)]">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-[var(--color-foreground)]">
          {title}
        </h3>
      </div>
      <p className="text-[var(--color-muted)] text-sm group-hover:text-[var(--color-accent)] transition-colors">
        {value}
      </p>
    </>
  );

  const baseClassName = `group rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-colors hover:border-[var(--color-accent)]/30 ${className}`;

  if (href) {
    return (
      <a href={href} className={baseClassName}>
        {content}
      </a>
    );
  }

  return <div className={baseClassName}>{content}</div>;
}


// Process Step Card Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface ProcessStepCardProps {
  step: string | number;
  title: string;
  description?: string;
  details?: string[];
  className?: string;
}

export function ProcessStepCard({
  step,
  title,
  description,
  details,
  className = "",
}: ProcessStepCardProps) {
  return (
    <div
      className={`rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 md:p-8 ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] flex items-center justify-center text-lg font-bold text-black">
            {step}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-[var(--color-muted)] mb-4">{description}</p>
          )}
          {details && details.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {details.map((detail, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-[var(--color-muted)]"
                >
                  <svg
                    className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {detail}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
