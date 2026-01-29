import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Logo */}
      <div className="fixed top-0 left-0 p-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/nodi-logo-symbol.png" alt="Nodi" width={32} height={32} className="rounded-md" />
          <span className="text-lg font-bold tracking-tight text-[var(--color-foreground)]">Nodi</span>
        </Link>
      </div>

      {/* Content */}
      <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/20">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
