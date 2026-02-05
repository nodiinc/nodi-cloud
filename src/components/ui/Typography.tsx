import { typography, textStyles } from "@/config/fonts";


// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface HeadingProps extends TextProps {
  as?: HeadingElement;
}


// Display Text (Hero headlines)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function DisplayText({ children, className = "", as: Component = "h1" }: HeadingProps) {
  return (
    <Component className={`${textStyles.display} ${className}`}>
      {children}
    </Component>
  );
}


// Page Title
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function PageTitle({ children, className = "", as: Component = "h1" }: HeadingProps) {
  return (
    <Component className={`${textStyles.pageTitle} ${className}`}>
      {children}
    </Component>
  );
}


// Section Title
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function SectionTitle({ children, className = "", as: Component = "h2" }: HeadingProps) {
  return (
    <Component className={`${textStyles.sectionTitle} ${className}`}>
      {children}
    </Component>
  );
}


// Subsection Title
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function SubsectionTitle({ children, className = "", as: Component = "h3" }: HeadingProps) {
  return (
    <Component className={`${textStyles.subsectionTitle} ${className}`}>
      {children}
    </Component>
  );
}


// Card Title
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function CardTitle({ children, className = "" }: TextProps) {
  return (
    <h3 className={`${textStyles.cardTitle} ${className}`}>
      {children}
    </h3>
  );
}


// Body Text
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function BodyText({ children, className = "" }: TextProps) {
  return <p className={`${textStyles.body} ${className}`}>{children}</p>;
}

export function BodyLarge({ children, className = "" }: TextProps) {
  return <p className={`${textStyles.bodyLarge} ${className}`}>{children}</p>;
}

export function BodySmall({ children, className = "" }: TextProps) {
  return <p className={`${textStyles.bodySmall} ${className}`}>{children}</p>;
}


// Muted Text (alias for BodyText)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function MutedText({ children, className = "" }: TextProps) {
  return <p className={`${textStyles.body} ${className}`}>{children}</p>;
}


// Card Description
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function CardDescription({ children, className = "" }: TextProps) {
  return (
    <p className={`${textStyles.body} leading-relaxed ${className}`}>
      {children}
    </p>
  );
}


// Label Text
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function LabelText({ children, className = "" }: TextProps) {
  return <span className={`${textStyles.label} ${className}`}>{children}</span>;
}

export function LabelAccent({ children, className = "" }: TextProps) {
  return <span className={`${textStyles.labelAccent} ${className}`}>{children}</span>;
}


// Code Text
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function CodeText({ children, className = "" }: TextProps) {
  return <code className={`${textStyles.code} ${className}`}>{children}</code>;
}

export function CodeBlock({ children, className = "" }: TextProps) {
  return <code className={`${textStyles.codeBlock} ${className}`}>{children}</code>;
}


// Gradient Text
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function GradientText({ children, className = "", as: Component = "span" }: HeadingProps) {
  return (
    <Component className={`bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] bg-clip-text text-transparent ${className}`}>
      {children}
    </Component>
  );
}


// Re-export typography config for direct access
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export { typography, textStyles };
