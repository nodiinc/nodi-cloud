"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/config/site";

const SOLUTIONS_MENU = {
  products: {
    label: "Products",
    items: [
      { name: "Edge Gateway", href: "/solutions/edge-gateway", desc: "산업용 엣지 게이트웨이" },
      { name: "Sparkplug B", href: "/solutions/sparkplug", desc: "IIoT 표준 프로토콜" },
      { name: "TagBus", href: "/solutions/tagbus", desc: "고속 데이터 버스" },
    ],
  },
  services: {
    label: "Services",
    items: [
      { name: "센서·계측기 설치", href: "/solutions/sensor-installation", desc: "현장 센서 및 계측기 구축" },
      { name: "데이터 수집 시스템 구축", href: "/solutions/data-collection", desc: "엣지 기반 통합 수집 시스템" },
    ],
  },
};

interface NavigationProps {
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
  signOutAction?: () => Promise<void>;
}

export default function Navigation({ user, signOutAction }: NavigationProps) {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-background)]/80 px-6 backdrop-blur-lg md:px-12">
      <Link href="/" className="flex items-center gap-3">
        <Image src={siteConfig.logo.symbol} alt={siteConfig.name} width={32} height={32} />
        <span className="text-lg font-bold tracking-tight text-[var(--color-foreground)]">{siteConfig.name}</span>
      </Link>

      <div className="flex items-center gap-8">
        {/* Solutions Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsSolutionsOpen(true)}
          onMouseLeave={() => setIsSolutionsOpen(false)}
        >
          <Link
            href="/solutions"
            className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] md:flex items-center gap-1"
          >
            Solutions
            <svg
              className={`w-4 h-4 transition-transform ${isSolutionsOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>

          {/* Dropdown Menu */}
          {isSolutionsOpen && (
            <div className="absolute top-full left-0 pt-2">
              <div className="w-72 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] shadow-xl overflow-hidden">
                {/* Products Section */}
                <div className="p-2">
                  <div className="px-3 py-2 text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                    {SOLUTIONS_MENU.products.label}
                  </div>
                  {SOLUTIONS_MENU.products.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 rounded-lg hover:bg-[var(--color-card-hover)] transition-colors"
                    >
                      <div className="text-sm font-medium text-[var(--color-foreground)]">{item.name}</div>
                      <div className="text-xs text-[var(--color-muted)]">{item.desc}</div>
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-[var(--color-border)]" />

                {/* Services Section */}
                <div className="p-2">
                  <div className="px-3 py-2 text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                    {SOLUTIONS_MENU.services.label}
                  </div>
                  {SOLUTIONS_MENU.services.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 rounded-lg hover:bg-[var(--color-card-hover)] transition-colors"
                    >
                      <div className="text-sm font-medium text-[var(--color-foreground)]">{item.name}</div>
                      <div className="text-xs text-[var(--color-muted)]">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <Link href="/platform" className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] md:block">
          Platform
        </Link>
        <Link href="/references" className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] md:block">
          References
        </Link>
        <Link href="/resources" className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] lg:block">
          Resources
        </Link>
        <Link href="/company" className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] lg:block">
          Company
        </Link>

        {user ? (
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-full border border-[var(--color-border)] pl-1 pr-4 py-1 text-sm font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-brand-blue)] flex items-center justify-center text-black text-xs font-semibold">
                {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
              </div>
              <span className="text-[var(--color-foreground)]">Dashboard</span>
            </Link>
            {signOutAction && (
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                >
                  Logout
                </button>
              </form>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
