import Link from "next/link";
import Image from "next/image";

const FEATURES = [
  {
    title: "실시간 모니터링",
    description: "연결된 모든 게이트웨이와 장비의 상태를 실시간으로 확인",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "원격 설정",
    description: "웹에서 게이트웨이 설정 변경 및 배포",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "알림 및 경고",
    description: "이상 징후 감지 시 즉시 알림 발송",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    title: "데이터 시각화",
    description: "트렌드 차트, 대시보드로 데이터 인사이트 확보",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
  {
    title: "사용자 관리",
    description: "역할 기반 접근 제어로 팀 협업",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: "API 연동",
    description: "REST API로 외부 시스템과 통합",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const SCREENSHOTS = [
  { title: "대시보드", desc: "게이트웨이 현황 한눈에" },
  { title: "장비 상세", desc: "실시간 태그 데이터" },
  { title: "설정 관리", desc: "원격 설정 변경" },
];

export default function PlatformPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-[var(--color-brand-cyan)]/10 text-[var(--color-brand-cyan)] text-sm font-medium">
            Nodi Cloud Platform
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-5xl mb-6">
            모든 현장을
            <br />
            <span className="bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] bg-clip-text text-transparent">
              하나의 대시보드에서
            </span>
          </h1>
          <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto mb-10">
            Nodi Cloud Platform은 분산된 산업 현장의 모든 데이터를
            <br className="hidden md:block" />
            통합 관리할 수 있는 클라우드 기반 모니터링 플랫폼입니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="rounded-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] px-8 py-3 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90"
            >
              무료로 시작하기
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-[var(--color-border)] px-8 py-3 text-sm font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              데모 요청
            </Link>
          </div>
        </div>

        {/* Screenshot Preview */}
        <div className="mb-20">
          <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-2 overflow-hidden">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-[var(--color-background)] to-[var(--color-card)] flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--color-brand-blue)]/20 to-[var(--color-brand-cyan)]/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[var(--color-brand-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-[var(--color-muted)]">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] text-center mb-12">
            주요 기능
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all hover:border-[var(--color-brand-cyan)]/30"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-cyan)]/10 text-[var(--color-brand-cyan)] flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-[var(--color-foreground)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] text-center mb-12">
            어떻게 동작하나요?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-brand-cyan)]/10 text-[var(--color-brand-cyan)] flex items-center justify-center text-xl font-bold">
                1
              </div>
              <h3 className="font-medium text-[var(--color-foreground)] mb-2">게이트웨이 설치</h3>
              <p className="text-sm text-[var(--color-muted)]">
                현장에 Edge Gateway를 설치하고<br />클라우드에 등록합니다
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-brand-cyan)]/10 text-[var(--color-brand-cyan)] flex items-center justify-center text-xl font-bold">
                2
              </div>
              <h3 className="font-medium text-[var(--color-foreground)] mb-2">장비 연결</h3>
              <p className="text-sm text-[var(--color-muted)]">
                PLC, 센서 등 현장 장비를<br />게이트웨이에 연결합니다
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-brand-cyan)]/10 text-[var(--color-brand-cyan)] flex items-center justify-center text-xl font-bold">
                3
              </div>
              <h3 className="font-medium text-[var(--color-foreground)] mb-2">모니터링 시작</h3>
              <p className="text-sm text-[var(--color-muted)]">
                대시보드에서 실시간 데이터를<br />확인하고 관리합니다
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-12">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            무료 체험으로 Nodi Cloud Platform의 모든 기능을 경험해보세요
          </p>
          <Link
            href="/login"
            className="inline-block rounded-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] px-8 py-3 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90"
          >
            무료로 시작하기
          </Link>
        </div>
      </div>
    </div>
  );
}
