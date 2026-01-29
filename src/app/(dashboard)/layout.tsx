import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/gateways", label: "Gateways", icon: "⬡" },
  { href: "/integrations", label: "Integrations", icon: "◈" },
  { href: "/settings", label: "Settings", icon: "⚙" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 z-40 flex w-60 flex-col border-r border-border bg-background">
        <div className="flex h-16 items-center gap-3 px-6">
          <Image src="/nodi-logo-symbol.png" alt="nodi" width={28} height={28} className="rounded-md" />
          <Link href="/" className="text-xl font-bold tracking-tight">
            nodi
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-card-hover hover:text-foreground"
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-card-hover" />
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">Guest User</p>
              <p className="truncate text-xs text-muted">guest@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 pl-60">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border bg-background/80 px-8 backdrop-blur-lg">
          <div className="flex-1" />
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
