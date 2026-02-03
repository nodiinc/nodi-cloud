import Link from "next/link";

const PRODUCTS = [
  {
    name: "Edge Gateway",
    href: "/solutions/edge-gateway",
    description: "산업 현장의 다양한 장비와 클라우드를 연결하는 엣지 게이트웨이",
    features: ["10+ 프로토콜 지원", "자동 복구", "원격 설정"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
  },
  {
    name: "Sparkplug B",
    href: "/solutions/sparkplug",
    description: "IIoT 표준 Sparkplug B 프로토콜 기반의 데이터 통신",
    features: ["MQTT 기반", "자동 디스커버리", "상태 관리"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: "TagBus",
    href: "/solutions/tagbus",
    description: "고속 pub/sub 메시징 기반의 실시간 데이터 버스",
    features: ["초저지연", "태그 기반", "스냅샷 지원"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const SERVICES = [
  {
    name: "센서·계측기 설치",
    href: "/solutions/sensor-installation",
    description: "전력, 환경, 설비 상태 계측을 위한 센서 및 계측기 설치 서비스",
    features: ["현장 조사", "설치 및 배선", "검증 및 교정"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    name: "데이터 수집 시스템 구축",
    href: "/solutions/data-collection",
    description: "Edge Gateway 기반 통합 데이터 수집 시스템 설계 및 구축 서비스",
    features: ["시스템 설계", "현장 구축", "클라우드 연동"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-5xl">
            Solutions
          </h1>
          <p className="mt-4 text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            산업 현장의 데이터를 클라우드로 연결하는 통합 솔루션
          </p>
        </div>

        {/* Products Section */}
        <section className="mb-20">
          <h2 className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-8">
            Products
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {PRODUCTS.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all hover:border-[var(--color-brand-cyan)]/50 hover:bg-[var(--color-card-hover)]"
              >
                <div className="mb-4 text-[var(--color-brand-cyan)]">{product.icon}</div>
                <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-[var(--color-muted)] mb-4 leading-relaxed">
                  {product.description}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-xs px-2 py-1 rounded-full bg-[var(--color-background)] text-[var(--color-muted)]"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section>
          <h2 className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-8">
            Services
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {SERVICES.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all hover:border-[var(--color-brand-cyan)]/50 hover:bg-[var(--color-card-hover)]"
              >
                <div className="mb-4 text-[var(--color-brand-cyan)]">{service.icon}</div>
                <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-[var(--color-muted)] mb-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-xs px-2 py-1 rounded-full bg-[var(--color-background)] text-[var(--color-muted)]"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-[var(--color-muted)] mb-6">
            어떤 솔루션이 적합한지 모르시겠나요?
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] px-8 py-3 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90"
          >
            상담 요청하기
          </Link>
        </div>
      </div>
    </div>
  );
}
