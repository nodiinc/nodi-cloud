// Card Grid Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type GridCols = 1 | 2 | 3 | 4 | 5 | 6;

interface CardGridProps {
  children: React.ReactNode;
  cols?: GridCols;
  mdCols?: GridCols;
  lgCols?: GridCols;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

const colStyles: Record<GridCols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const mdColStyles: Record<GridCols, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
};

const lgColStyles: Record<GridCols, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

const gapStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export function CardGrid({
  children,
  cols = 1,
  mdCols,
  lgCols,
  gap = "md",
  className = "",
}: CardGridProps) {
  const mdClass = mdCols ? mdColStyles[mdCols] : "";
  const lgClass = lgCols ? lgColStyles[lgCols] : "";
  const classes = `grid ${colStyles[cols]} ${mdClass} ${lgClass} ${gapStyles[gap]} ${className}`;

  return <div className={classes}>{children}</div>;
}


// Flex Container Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface FlexContainerProps {
  children: React.ReactNode;
  gap?: "sm" | "md" | "lg";
  wrap?: boolean;
  justify?: "start" | "center" | "end" | "between";
  align?: "start" | "center" | "end";
  className?: string;
}

const justifyStyles: Record<string, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

const alignStyles: Record<string, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
};

export function FlexContainer({
  children,
  gap = "md",
  wrap = false,
  justify = "start",
  align = "center",
  className = "",
}: FlexContainerProps) {
  const wrapClass = wrap ? "flex-wrap" : "";
  const classes = `flex ${gapStyles[gap]} ${wrapClass} ${justifyStyles[justify]} ${alignStyles[align]} ${className}`;

  return <div className={classes}>{children}</div>;
}
