import { typography, textStyles } from "@/config/fonts";


// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

interface HeadingProps extends TextProps {
  as?: HeadingElement;
}


// Headings
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function Display({ children, className = "", as: Component = "h1" }: HeadingProps) {
  return <Component className={`${textStyles.display} ${className}`}>{children}</Component>;
}

export function PageTitle({ children, className = "", as: Component = "h1" }: HeadingProps) {
  return <Component className={`${textStyles.pageTitle} ${className}`}>{children}</Component>;
}

export function SectionTitle({ children, className = "", as: Component = "h2" }: HeadingProps) {
  return <Component className={`${textStyles.section} ${className}`}>{children}</Component>;
}

export function Title({ children, className = "", as: Component = "h3" }: HeadingProps) {
  return <Component className={`${textStyles.title} ${className}`}>{children}</Component>;
}


// Body Text
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function Body({ children, className = "" }: TextProps) {
  return <p className={`${textStyles.body} ${className}`}>{children}</p>;
}

export function Small({ children, className = "" }: TextProps) {
  return <span className={`${textStyles.small} ${className}`}>{children}</span>;
}

export function Label({ children, className = "" }: TextProps) {
  return <span className={`${textStyles.label} ${className}`}>{children}</span>;
}

export function LabelAccent({ children, className = "" }: TextProps) {
  return <span className={`${textStyles.labelAccent} ${className}`}>{children}</span>;
}


// Code
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function Code({ children, className = "" }: TextProps) {
  return <code className={`${textStyles.code} ${className}`}>{children}</code>;
}

export function CodeMuted({ children, className = "" }: TextProps) {
  return <code className={`${textStyles.codeMuted} ${className}`}>{children}</code>;
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


// Aliases (backward compatibility)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const DisplayText = Display;
export const CardTitle = Title;
export const CardDescription = Body;
export const MutedText = Body;
export const BodyText = Body;
export const BodyLarge = Body;
export const BodySmall = Small;
export const SubsectionTitle = Title;
export const LabelText = Label;
export const CodeText = Code;
export const CodeBlock = CodeMuted;


// Re-export config
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export { typography, textStyles };
