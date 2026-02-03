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
      <footer className="border-t border-border py-8 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] items-start">
            {/* Left: Logo, Tagline & Copyright */}
            <div className="space-y-1">
              <Link href="/" className="text-xl font-bold tracking-tight">
                Nodi
              </Link>
              <p className="text-sm text-muted">
                Bring your nodes into the box
              </p>
              <p className="text-xs text-muted">
                &copy; 2026 Nodi. All rights reserved.
              </p>
            </div>

            {/* Right: Contact Info */}
            <div className="text-sm text-muted space-y-1 md:text-right">
              <p>서울특별시 강남구 테헤란로 123, 456호</p>
              <p>
                <a href="tel:+82-2-1234-5678" className="hover:text-foreground transition-colors">+82-2-1234-5678</a>
                {" | "}
                <a href="mailto:contact@nodi.co.kr" className="hover:text-foreground transition-colors">contact@nodi.co.kr</a>
              </p>
              <p>사업자등록번호: 123-45-67890</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
