import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const navItems = [
    { href: "/nodi-edge", label: "nodi-edge", icon: "⬡" },
    { href: "/integrations", label: "Integrations", icon: "◈" },
    { href: "/settings", label: "Settings", icon: "⚙" },
  ];

  // 관리자면 admin 메뉴 추가
  if (session.user.role === "ADMIN") {
    navItems.push({ href: "/admin/customers", label: "Admin", icon: "👤" });
  }

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-60 border-r border-[var(--border)] bg-[var(--card)] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[var(--border)]">
          <Link href="/nodi-edge" className="flex items-center gap-3">
            <Image src="/nodi-logo-symbol.png" alt="nodi" width={32} height={32} />
            <span className="font-semibold text-lg">nodi cloud</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-hover)] transition-colors"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User */}
        <div className="p-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-black font-medium">
              {session.user.name?.[0] || session.user.email[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{session.user.name || "User"}</p>
              <p className="text-xs text-[var(--muted)] truncate">{session.user.email}</p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="w-full mt-2 px-4 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-hover)] rounded-lg transition-colors text-left"
            >
              로그아웃
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-60">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
