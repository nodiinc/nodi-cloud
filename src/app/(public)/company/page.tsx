import Image from "next/image";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import KakaoMap from "@/components/KakaoMap";

const CAPABILITIES = [
  {
    icon: "⬡",
    title: "프로토콜 통합",
    description:
      "MQTT, OPC UA, Modbus 등 10개 이상의 산업 프로토콜을 하나의 게이트웨이에서 통합 관리합니다.",
  },
  {
    icon: "◈",
    title: "엣지 데이터 처리",
    description:
      "현장에서 데이터를 전처리하고 필터링하여 네트워크 부하를 줄이고 응답 속도를 높입니다.",
  },
  {
    icon: "◇",
    title: "원격 관리",
    description:
      "클라우드 대시보드에서 모든 게이트웨이를 실시간으로 모니터링하고 설정을 변경할 수 있습니다.",
  },
];

const CONTACT_INFO = {
  address: "서울특별시 강남구 테헤란로 123, 456호",
  email: "contact@nodi.co.kr",
  phone: "+82-2-1234-5678",
  coordinates: {
    latitude: 37.5065,
    longitude: 127.0536,
  },
};

export default async function CompanyPage() {
  const session = await auth();

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-background)]/80 px-6 backdrop-blur-lg md:px-12">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/nodi-logo-symbol.png" alt="Nodi" width={32} height={32} />
          <span className="text-lg font-bold tracking-tight text-[var(--color-foreground)]">Nodi</span>
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/platform" className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] md:block">
            Platform
          </Link>
          <Link href="/solutions" className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] md:block">
            Solutions
          </Link>
          <Link href="/integrations" className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] md:block">
            Integrations
          </Link>
          <Link href="/resources" className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] lg:block">
            Resources
          </Link>
          <Link href="/company" className="hidden text-sm text-[var(--color-foreground)] transition-colors lg:block">
            Company
          </Link>

          {session?.user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-full border border-[var(--color-border)] pl-1 pr-4 py-1 text-sm font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-brand-blue)] flex items-center justify-center text-black text-xs font-semibold">
                  {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-[var(--color-foreground)]">Dashboard</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                >
                  Logout
                </button>
              </form>
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

      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center px-6 pt-16 text-center">
        {/* Background effects */}
        <div className="pointer-events-none absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-[var(--color-brand-blue)]/8 blur-3xl" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-[var(--color-brand-cyan)]/6 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <p className="mb-4 text-base font-medium uppercase tracking-widest text-[var(--color-accent)]">
            About Nodi
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[var(--color-foreground)] md:text-6xl">
            공장 데이터 연결의
            <br />
            <span className="bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] bg-clip-text text-transparent">
              복잡함을 해결합니다
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)] leading-relaxed">
            수십 가지 프로토콜, 수백 대의 장비, 끊임없는 데이터.
            <br className="hidden sm:block" />
            Nodi는 이 모든 것을 하나로 연결하는 산업용 엣지 게이트웨이 플랫폼입니다.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="mb-4 text-base font-medium uppercase tracking-widest text-[var(--color-accent)]">
              What We Do
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-4xl">
              산업 현장과 클라우드를 잇는 핵심 기술
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {CAPABILITIES.map((item, index) => (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-card-hover)]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-brand-blue)]/20 to-[var(--color-brand-cyan)]/20 text-2xl text-[var(--color-accent)]">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-3">
                  {item.title}
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  {item.description}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="mx-auto max-w-4xl text-center relative">
          <p className="mb-4 text-base font-medium uppercase tracking-widest text-[var(--color-accent)]">
            Our Vision
          </p>
          <blockquote className="text-3xl md:text-4xl font-light leading-relaxed text-[var(--color-foreground)]">
            &ldquo;모든 산업 현장의 데이터가
            <br />
            <span className="font-semibold bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] bg-clip-text text-transparent">
              자유롭게 흐르는 세상
            </span>
            을 만듭니다&rdquo;
          </blockquote>
          <p className="mt-8 text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
            Nodi는 복잡한 산업 환경에서도 데이터가 끊김 없이 흐를 수 있도록,
            안정적이고 확장 가능한 연결 인프라를 제공합니다.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-4xl">
              Contact Us
            </h2>
            <p className="mt-4 text-[var(--color-muted)]">
              언제든지 문의해 주세요
            </p>
          </div>

          {/* Map */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-2 overflow-hidden mb-8">
            <KakaoMap
              latitude={CONTACT_INFO.coordinates.latitude}
              longitude={CONTACT_INFO.coordinates.longitude}
              className="h-[320px] md:h-[400px]"
            />
          </div>

          {/* Contact Cards */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            {/* Address */}
            <div className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-colors hover:border-[var(--color-accent)]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-brand-blue)]/10 to-[var(--color-brand-cyan)]/10 text-[var(--color-accent)]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-[var(--color-foreground)]">주소</h3>
              </div>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">{CONTACT_INFO.address}</p>
            </div>

            {/* Email */}
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-colors hover:border-[var(--color-accent)]/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-brand-blue)]/10 to-[var(--color-brand-cyan)]/10 text-[var(--color-accent)]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-[var(--color-foreground)]">이메일</h3>
              </div>
              <p className="text-[var(--color-muted)] text-sm group-hover:text-[var(--color-accent)] transition-colors">{CONTACT_INFO.email}</p>
            </a>

            {/* Phone */}
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-colors hover:border-[var(--color-accent)]/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-brand-blue)]/10 to-[var(--color-brand-cyan)]/10 text-[var(--color-accent)]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-[var(--color-foreground)]">전화</h3>
              </div>
              <p className="text-[var(--color-muted)] text-sm group-hover:text-[var(--color-accent)] transition-colors">{CONTACT_INFO.phone}</p>
            </a>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] px-8 py-3.5 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90"
            >
              문의하기
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
