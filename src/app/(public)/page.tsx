import Link from "next/link";

const PROTOCOLS = [
  { name: "MQTT", category: "Cloud" },
  { name: "Sparkplug B", category: "Cloud" },
  { name: "OPC UA", category: "Cloud" },
  { name: "Kafka", category: "Cloud" },
  { name: "REST API", category: "Cloud" },
  { name: "Modbus TCP", category: "Field" },
  { name: "Modbus RTU", category: "Field" },
  { name: "SQL", category: "Field" },
  { name: "TSDB", category: "Field" },
  { name: "Fieldbus", category: "Field" },
];

const FEATURES = [
  {
    title: "Real-time Monitoring",
    description: "Monitor all connected devices and sensors with sub-second latency.",
  },
  {
    title: "Bidirectional Control",
    description: "Not just data collection — send commands and configurations back to field devices.",
  },
  {
    title: "Auto Recovery",
    description: "FSM-based lifecycle management with automatic reconnection and fault recovery.",
  },
  {
    title: "Protocol Agnostic",
    description: "10+ industrial protocols supported. Connect any device, any system.",
  },
  {
    title: "Edge Intelligence",
    description: "Process and filter data at the edge before sending to cloud. Reduce bandwidth, increase speed.",
  },
  {
    title: "Remote Configuration",
    description: "Configure and update your gateways remotely through the cloud dashboard.",
  },
];

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Background gradient glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[var(--color-brand-blue)]/10 to-[var(--color-brand-cyan)]/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <h1 className="text-5xl font-semibold leading-tight tracking-tight text-[var(--color-foreground)] md:text-7xl">
            제조 AI 도입,
            <br />
            <span className="bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] bg-clip-text text-transparent">
              데이터 수집이 첫걸음입니다
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)] md:text-xl leading-relaxed">
            제조 AI 도입이 가속화되고 있지만,
            많은 현장에서는 AI 모델 구축을 위한 데이터 인프라가 갖춰지지 않은 상황입니다.
            <br className="hidden md:block" />
            Nodi는 산업 현장에 특화된 데이터 수집 솔루션을 제공합니다.
          </p>
          <div className="mt-10">
            <Link
              href="/solutions"
              className="rounded-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] px-8 py-3 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90"
            >
              솔루션 알아보기
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-4xl">
            산업 현장을 위한 설계
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-muted)]">
            현장 장비부터 클라우드까지, 데이터 수집에 필요한 모든 것을 제공합니다.
          </p>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all hover:border-[var(--color-brand-cyan)]/30 hover:bg-[var(--color-card-hover)]"
              >
                <h3 className="text-lg font-medium text-[var(--color-foreground)]">{feature.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocols Section */}
      <section className="py-24 px-6 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-4xl">
            다양한 프로토콜 지원
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-muted)]">
            클라우드 메시징부터 필드버스까지, 하나의 플랫폼으로 연결합니다.
          </p>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PROTOCOLS.map((protocol) => (
              <div
                key={protocol.name}
                className="flex flex-col items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-center transition-all hover:border-[var(--color-brand-cyan)]/30 hover:bg-[var(--color-card-hover)]"
              >
                <span className="font-mono text-sm font-medium text-[var(--color-foreground)]">{protocol.name}</span>
                <span className="mt-1 text-xs text-[var(--color-muted)]">{protocol.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-4xl">
            AI 전환, 데이터 수집부터 시작하세요
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            현장 환경에 맞는 데이터 수집 방안을 함께 설계해 드립니다.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] px-8 py-3 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90"
          >
            상담 요청하기
          </Link>
        </div>
      </section>
    </>
  );
}
