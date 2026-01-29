import Link from "next/link";

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur-lg bg-background/80">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-xl font-bold tracking-tight">
            nodi
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/integrations" className="text-sm text-foreground font-medium">
              Integrations
            </Link>
            <Link href="/products" className="text-sm text-muted hover:text-foreground transition-colors">
              Products
            </Link>
          </div>
          <Link
            href="/gateways"
            className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Dashboard
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-6 pt-24 pb-16">
        {children}
      </main>
    </div>
  );
}
