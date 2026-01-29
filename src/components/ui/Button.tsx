import { forwardRef, ButtonHTMLAttributes } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

interface ButtonAsButtonProps extends ButtonBaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-accent)] text-black font-medium hover:opacity-90 disabled:opacity-50",
  secondary:
    "bg-[var(--color-card-hover)] border border-[var(--color-border)] text-[var(--color-foreground)] font-medium hover:border-[var(--color-muted)]/50 disabled:opacity-50",
  ghost:
    "text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-card-hover)] disabled:opacity-50",
  danger:
    "bg-red-500/10 border border-red-500/20 text-red-400 font-medium hover:bg-red-500/20 disabled:opacity-50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-4 py-2.5 text-sm rounded-lg",
  lg: "px-4 py-3 text-base rounded-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonAsButtonProps>(
  ({ variant = "primary", size = "md", fullWidth = false, className = "", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 transition-all";
    const widthStyles = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export function ButtonLink({
  variant = "primary",
  size = "md",
  fullWidth = false,
  href,
  className = "",
  children,
}: ButtonAsLinkProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 transition-all";
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
    >
      {children}
    </Link>
  );
}
