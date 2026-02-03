import Link from "next/link";
import NavigationWrapper from "@/components/NavigationWrapper";
import { siteConfig } from "@/config";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { company, tagline } = siteConfig;

  return (
    <div className="min-h-screen">
      <NavigationWrapper />
      <main className="pt-16">
        {children}
      </main>
      <footer className="border-t border-[var(--color-border)] py-8 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] items-start">
            {/* Left: Logo, Tagline & Copyright */}
            <div className="space-y-1">
              <Link href="/" className="text-xl font-bold tracking-tight">
                {siteConfig.name}
              </Link>
              <p className="text-sm text-[var(--color-muted)]">
                {tagline}
              </p>
              <p className="text-xs text-[var(--color-muted)]">
                &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
              </p>
            </div>

            {/* Right: Contact Info */}
            <div className="text-sm text-[var(--color-muted)] space-y-1 md:text-right">
              <p>{company.address}</p>
              <p>
                <a href={`tel:${company.phone}`} className="hover:text-[var(--color-foreground)] transition-colors">{company.phone}</a>
                {" | "}
                <a href={`mailto:${company.email}`} className="hover:text-[var(--color-foreground)] transition-colors">{company.email}</a>
              </p>
              <p>사업자등록번호: {company.businessNumber}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
