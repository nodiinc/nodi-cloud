import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, padding = "md", className = "", children, ...props }, ref) => {
    const baseStyles = "rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]";
    const hoverStyles = hover
      ? "transition-all hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-card-hover)]"
      : "";

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
