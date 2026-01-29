import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/nodi-edge");
  }

  const navItems = [
    { href: "/admin/customers", label: "고객 관리" },
    { href: "/admin/users", label: "사용자 관리" },
    { href: "/admin/nodi-edge", label: "게이트웨이 관리" },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/nodi-edge" className="flex items-center gap-3">
              <Image src="/nodi-logo-symbol.png" alt="nodi" width={32} height={32} />
              <span className="font-semibold">nodi cloud</span>
            </Link>
            <span className="text-[var(--muted)]">/</span>
            <span className="text-[var(--accent)]">Admin</span>
          </div>

          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/nodi-edge"
              className="text-sm px-4 py-2 border border-[var(--border)] rounded-full hover:bg-[var(--card-hover)] transition-colors"
            >
              대시보드로
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
