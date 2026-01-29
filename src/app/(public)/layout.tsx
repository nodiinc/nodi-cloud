import Link from "next/link";

export default function PublicLayout({
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
            <Link href="/products" className="text-sm text-muted hover:text-foreground transition-colors">
              Products
            </Link>
            <Link href="/integrations" className="text-sm text-muted hover:text-foreground transition-colors">
              Integrations
            </Link>
            <Link href="/contact" className="text-sm text-muted hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/gateways"
              className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Dashboard
            </Link>
          </div>
        </nav>
      </header>
      <main className="pt-16">
        {children}
      </main>
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted">
              &copy; 2026 nodi. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/contact" className="text-sm text-muted hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
