// Font Configuration
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Note: Actual font loading happens in src/app/layout.tsx
// Next.js font loader requires literal values, so we can't use these variables there

export const fontsConfig = {
  families: {
    sans: "Inter",
    mono: "JetBrains Mono",
  },
  variables: {
    sans: "--font-inter",
    mono: "--font-jetbrains-mono",
  },
};


// Typography Scale (6 levels only)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// display     → Hero headlines (landing page)
// pageTitle   → Page titles
// section     → Section headers
// title       → Card titles, subsections
// body        → Default text
// small       → Labels, meta, captions
//

export const typography = {
  // Display - Hero headlines only
  display: "text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight",

  // Page Title - Top of each page
  pageTitle: "text-3xl md:text-4xl font-semibold tracking-tight",

  // Section - Section headers within a page
  section: "text-xl md:text-2xl font-semibold",

  // Title - Card titles, subsection headers
  title: "text-base md:text-lg font-semibold",

  // Body - Standard text (default)
  body: "text-sm leading-relaxed",

  // Small - Labels, badges, meta info, captions
  small: "text-xs",

  // Label - Uppercase labels
  label: "text-xs font-medium uppercase tracking-wider",

  // Code
  code: "font-mono text-sm",
};


// Text Styles (typography + color)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const textStyles = {
  // Headings (foreground color)
  display: `${typography.display} text-[var(--color-foreground)]`,
  pageTitle: `${typography.pageTitle} text-[var(--color-foreground)]`,
  section: `${typography.section} text-[var(--color-foreground)]`,
  title: `${typography.title} text-[var(--color-foreground)]`,

  // Body (muted color)
  body: `${typography.body} text-[var(--color-muted)]`,
  small: `${typography.small} text-[var(--color-muted)]`,

  // Labels
  label: `${typography.label} text-[var(--color-muted)]`,
  labelAccent: `${typography.label} text-[var(--color-accent)]`,

  // Code
  code: `${typography.code} text-[var(--color-accent)]`,
  codeMuted: `${typography.code} text-[var(--color-muted)]`,
};
