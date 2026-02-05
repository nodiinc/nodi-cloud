// Font Configuration
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Note: Actual font loading happens in src/app/layout.tsx
// Next.js font loader requires literal values, so we can't use these variables there
// This config is for reference and typography style definitions

export const fontsConfig = {
  // Font Families
  families: {
    sans: "Inter",
    mono: "JetBrains Mono",
  },

  // CSS Variable Names (defined in layout.tsx)
  variables: {
    sans: "--font-inter",
    mono: "--font-jetbrains-mono",
  },
};


// Typography Styles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const typography = {
  // Display - Landing hero, main headlines
  display: "text-5xl md:text-7xl font-semibold leading-tight tracking-tight",

  // Page Title - Top of each page
  pageTitle: "text-4xl md:text-5xl font-semibold tracking-tight",

  // Section Title - Major sections within a page
  sectionTitle: "text-2xl font-semibold",

  // Subsection Title - Subsections, card groups
  subsectionTitle: "text-xl font-semibold",

  // Card Title - Individual card headers
  cardTitle: "text-lg font-semibold",

  // Body Large - Intro paragraphs, descriptions
  bodyLarge: "text-lg",

  // Body - Standard body text
  body: "text-sm",

  // Body Small - Secondary text, captions
  bodySmall: "text-xs",

  // Label - Section labels, badges, meta info
  label: "text-xs font-medium uppercase tracking-wider",

  // Code - Inline code, technical values
  code: "font-mono",

  // Code Block - Code blocks, component names
  codeBlock: "text-sm font-mono",
};


// Semantic Typography (with color)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const textStyles = {
  // Headings
  display: `${typography.display} text-[var(--color-foreground)]`,
  pageTitle: `${typography.pageTitle} text-[var(--color-foreground)]`,
  sectionTitle: `${typography.sectionTitle} text-[var(--color-foreground)]`,
  subsectionTitle: `${typography.subsectionTitle} text-[var(--color-foreground)]`,
  cardTitle: `${typography.cardTitle} text-[var(--color-foreground)]`,

  // Body
  bodyLarge: `${typography.bodyLarge} text-[var(--color-muted)]`,
  body: `${typography.body} text-[var(--color-muted)]`,
  bodySmall: `${typography.bodySmall} text-[var(--color-muted)]`,

  // Special
  label: `${typography.label} text-[var(--color-muted)]`,
  labelAccent: `${typography.label} text-[var(--color-accent)]`,
  code: `${typography.code} text-[var(--color-accent)]`,
  codeBlock: `${typography.codeBlock} text-[var(--color-muted)]`,
};
