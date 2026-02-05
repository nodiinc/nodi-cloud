// IconBox Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type IconBoxSize = "xs" | "sm" | "md" | "lg" | "xl";
type IconBoxVariant = "default" | "gradient" | "solid";

interface IconBoxProps {
  size?: IconBoxSize;
  variant?: IconBoxVariant;
  children: React.ReactNode;
  className?: string;
}

const sizeStyles: Record<IconBoxSize, string> = {
  xs: "w-6 h-6 text-sm",
  sm: "w-9 h-9 text-base",
  md: "w-12 h-12 text-xl",
  lg: "w-14 h-14 text-2xl",
  xl: "w-16 h-16 text-3xl",
};

const variantStyles: Record<IconBoxVariant, string> = {
  default: "bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
  gradient: "bg-gradient-to-br from-[var(--color-brand-blue)]/20 to-[var(--color-brand-cyan)]/20 text-[var(--color-accent)]",
  solid: "bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] text-black",
};

export function IconBox({
  size = "md",
  variant = "default",
  children,
  className = "",
}: IconBoxProps) {
  const classes = `flex items-center justify-center rounded-xl ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  return <div className={classes}>{children}</div>;
}


// Circular Icon (for numbered steps)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function CircleIcon({
  size = "md",
  variant = "default",
  children,
  className = "",
}: IconBoxProps) {
  const classes = `flex items-center justify-center rounded-full font-bold ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  return <div className={classes}>{children}</div>;
}
