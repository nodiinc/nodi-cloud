import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "⬡" },
    { href: "/settings", label: "Settings", icon: "⚙" },
    { href: "/admin/customers", label: "Admin", icon: "◆", active: true },
  ];

  const adminSubItems = [
    { href: "/admin/customers", label: "고객 관리" },
    { href: "/admin/users", label: "사용자 관리" },
    { href: "/admin/gateways", label: "게이트웨이 관리" },
    { href: "/admin/inquiries", label: "문의 관리" },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-[var(--color-border)] bg-[var(--color-card)] flex flex-col z-50">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[var(--color-border)]">
          <Link href="/" className="flex items-center gap-3">
            <Image src={siteConfig.logo.symbol} alt={siteConfig.name} width={28} height={28} />
            <span className="font-semibold text-lg text-[var(--color-foreground)]">{siteConfig.name} Cloud</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                  item.active
                    ? "text-[var(--color-accent)] bg-[var(--color-accent)]/10"
                    : "text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-card-hover)]"
                }`}
              >
                <span className="text-base opacity-70">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Admin Sub Menu */}
          <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
            <p className="px-4 mb-3 text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
              Admin
            </p>
            <div className="space-y-1">
              {adminSubItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-card-hover)] transition-all duration-150"
                >
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* User */}
        <div className="border-t border-[var(--color-border)] p-3">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[var(--color-background)]/50">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-brand-blue)] flex items-center justify-center text-black font-semibold text-sm">
              {session.user.name?.[0]?.toUpperCase() || session.user.email[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--color-foreground)] truncate">
                {session.user.name || "User"}
              </p>
              <p className="text-xs text-[var(--color-muted)] truncate">{session.user.email}</p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="w-full mt-3 px-4 py-2.5 text-sm text-[var(--color-muted)] bg-[var(--color-card-hover)] border border-[var(--color-border)] hover:text-[var(--color-foreground)] hover:border-[var(--color-muted)]/50 rounded-lg transition-all"
            >
              로그아웃
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
