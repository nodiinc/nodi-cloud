"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/config/site";

const SOLUTIONS_MENU = [
  {
    label: "Products",
    items: [
      { name: "Edge Gateway", href: "/solutions/edge-gateway", desc: "산업용 엣지 게이트웨이" },
      { name: "TagBus", href: "/solutions/tagbus", desc: "고속 데이터 버스" },
      { name: "Sparkplug B", href: "/solutions/sparkplug", desc: "IIoT 표준 프로토콜" },
    ],
  },
  {
    label: "Platform",
    items: [
      { name: "Nodi Cloud", href: "/platform", desc: "클라우드 관리 플랫폼" },
    ],
  },
  {
    label: "Services",
    items: [
      { name: "데이터 수집 시스템 구축", href: "/solutions/data-collection", desc: "엣지 기반 통합 수집 시스템" },
      { name: "센서 · 계측기 설치", href: "/solutions/sensor-installation", desc: "현장 센서 및 계측기 구축" },
    ],
  },
];

const NAV_LINKS = [
  { name: "Solutions", href: "/solutions" },
  { name: "Industries", href: "/industries" },
  { name: "References", href: "/references" },
  { name: "Company", href: "/company" },
];

interface NavigationProps {
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
  signOutAction?: () => Promise<void>;
}

export default function Navigation({ user, signOutAction }: NavigationProps) {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  const loginOrDashboard = user ? (
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
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-lg">
      {/* Top row: Logo + Desktop nav + Login */}
      <div className="flex h-16 items-center justify-between px-6 md:px-12">
        <Link href="/" className="flex items-center gap-3">
          <Image src={siteConfig.logo.symbol} alt={siteConfig.name} width={32} height={32} />
          <span className="text-lg font-bold tracking-tight text-[var(--color-foreground)]">{siteConfig.name}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsSolutionsOpen(true)}
            onMouseLeave={() => setIsSolutionsOpen(false)}
          >
            <Link
              href="/solutions"
              className="flex text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] items-center gap-1"
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
                  {SOLUTIONS_MENU.map((section, index) => (
                    <div key={section.label}>
                      {index > 0 && <div className="border-t border-[var(--color-border)]" />}
                      <div className="pt-2 pb-1">
                        <div className="px-4 py-1.5 text-[10px] font-semibold text-[var(--color-muted)]/60 uppercase tracking-widest">
                          {section.label}
                        </div>
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block mx-2 px-3 py-2 rounded-lg border-l-2 border-transparent hover:border-[var(--color-brand-cyan)] hover:bg-[var(--color-card-hover)] transition-all"
                          >
                            <div className="text-sm font-medium text-[var(--color-foreground)]">{item.name}</div>
                            <div className="text-xs text-[var(--color-muted)]">{item.desc}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/industries" className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]">
            Industries
          </Link>
          <Link href="/references" className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]">
            References
          </Link>
          <Link href="/company" className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]">
            Company
          </Link>

          {loginOrDashboard}
        </div>

        {/* Mobile: Login only */}
        <div className="md:hidden">
          {loginOrDashboard}
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="flex md:hidden items-center gap-6 overflow-x-auto px-6 pb-3 no-scrollbar">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
