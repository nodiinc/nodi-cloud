import Link from "next/link";

const PROTOCOLS = [
  {
    name: "Modbus TCP/RTU",
    category: "Field",
    description: "Client & Server 모드 지원, FC01-FC06/FC15-FC16",
  },
  {
    name: "OPC UA",
    category: "Field",
    description: "Client & Server 모드, 인증서 기반 보안",
  },
  {
    name: "MQTT",
    category: "Cloud",
    description: "Sparkplug B 호환, QoS 지원",
  },
  {
    name: "Kafka",
    category: "Cloud",
    description: "Producer/Consumer, 압축 및 배치 처리",
  },
  {
    name: "SQL",
    category: "Database",
    description: "PostgreSQL, MSSQL, SQLite 지원",
  },
  {
    name: "REST API",
    category: "Cloud",
    description: "HTTP 엔드포인트, 데이터 조회/제어",
  },
];

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "실시간 데이터 수집",
    description: "마이크로초 단위의 실행 주기로 현장 장비 데이터를 실시간 수집. 큐 기반 비동기 처리로 데이터 손실 없이 고속 처리.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "멀티 프로토콜",
    description: "Modbus, OPC UA, MQTT, Kafka, SQL 등 10개 이상의 산업 표준 프로토콜을 단일 게이트웨이에서 통합 지원.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "자동 복구",
    description: "FSM 기반 라이프사이클 관리로 연결 끊김, 장치 재시작 시 자동 재연결. 스냅샷 기반 상태 복구.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "시스템 모니터링",
    description: "CPU, 메모리, 디스크, 네트워크 상태를 실시간 모니터링. 이상 징후 감지 시 자동 알림.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    title: "데이터 아카이브",
    description: "InfluxDB 기반 시계열 데이터 저장. 설정 가능한 보관 주기로 장기 데이터 분석 지원.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "보안",
    description: "인증서 기반 OPC UA 인증, IPSec VPN, SSL/TLS 암호화로 산업 환경에 적합한 보안 수준 제공.",
  },
];

const ARCHITECTURE_LAYERS = [
  { name: "Cloud Layer", items: ["Nodi Cloud Platform", "MQTT Broker", "Kafka Cluster"], color: "cyan" },
  { name: "Edge Gateway", items: ["Protocol Handlers", "Data Store", "Archive", "Monitor"], color: "accent" },
  { name: "Field Layer", items: ["PLC", "센서", "계측기", "HMI"], color: "blue" },
];

const SPECS = [
  { label: "실행 주기", value: "1ms ~" },
  { label: "지원 프로토콜", value: "10+" },
  { label: "동시 연결", value: "100+" },
  { label: "데이터 보관", value: "90일+" },
];

export default function EdgeGatewayPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className="text-center mb-20">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Solutions
          </Link>
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-5xl mb-6">
            Edge Gateway
          </h1>
          <p className="text-lg text-[var(--color-muted)] max-w-3xl mx-auto leading-relaxed">
            산업 현장의 다양한 장비와 클라우드를 연결하는 고성능 엣지 게이트웨이.
            <br className="hidden md:block" />
            10개 이상의 프로토콜을 지원하며, 실시간 데이터 수집부터 원격 제어까지 통합 관리합니다.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {SPECS.map((spec) => (
              <div
                key={spec.label}
                className="px-6 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]"
              >
                <div className="text-2xl font-semibold text-[var(--color-accent)]">{spec.value}</div>
                <div className="text-sm text-[var(--color-muted)]">{spec.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <section className="mb-24">
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

        {/* Protocols */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] text-center mb-4">
            지원 프로토콜
          </h2>
          <p className="text-center text-[var(--color-muted)] mb-12">
            다양한 산업 표준 프로토콜을 단일 게이트웨이에서 통합 지원
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PROTOCOLS.map((protocol) => (
              <div
                key={protocol.name}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all hover:border-[var(--color-brand-cyan)]/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-medium text-[var(--color-foreground)]">
                    {protocol.name}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-[var(--color-background)] text-[var(--color-muted)]">
                    {protocol.category}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-muted)]">{protocol.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture Diagram */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] text-center mb-4">
            시스템 구성도
          </h2>
          <p className="text-center text-[var(--color-muted)] mb-8">
            Edge Gateway를 중심으로 현장 장비와 클라우드를 연결하는 데이터 흐름
          </p>
          {/* Diagram Image Placeholder */}
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 overflow-hidden">
              <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-[var(--color-background)] to-[var(--color-card)] flex items-center justify-center">
                {/* Replace with actual diagram image: <Image src="/diagrams/edge-gateway-architecture.png" ... /> */}
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--color-brand-blue)]/20 to-[var(--color-brand-cyan)]/20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-[var(--color-brand-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </div>
                  <p className="text-[var(--color-muted)]">Architecture Diagram</p>
                  <p className="text-sm text-[var(--color-muted)]/60 mt-2">
                    /public/diagrams/edge-gateway-architecture.png
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Layers */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] text-center mb-4">
            아키텍처 구조
          </h2>
          <p className="text-center text-[var(--color-muted)] mb-12">
            현장 장비부터 클라우드까지 3계층 구조로 데이터 흐름 관리
          </p>
          <div className="max-w-2xl mx-auto space-y-4">
            {ARCHITECTURE_LAYERS.map((layer, index) => (
              <div key={layer.name}>
                <div
                  className={`rounded-xl border p-6 ${
                    layer.color === "accent"
                      ? "border-[var(--color-accent)]/50 bg-[var(--color-accent)]/5"
                      : "border-[var(--color-border)] bg-[var(--color-card)]"
                  }`}
                >
                  <div className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-3">
                    {layer.name}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                          layer.color === "accent"
                            ? "bg-[var(--color-accent)]/20 text-[var(--color-accent)]"
                            : "bg-[var(--color-background)] text-[var(--color-foreground)]"
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                {index < ARCHITECTURE_LAYERS.length - 1 && (
                  <div className="flex justify-center py-2">
                    <svg className="w-6 h-6 text-[var(--color-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] text-center mb-12">
            적용 사례
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <div className="text-3xl mb-4">🏭</div>
              <h3 className="font-medium text-[var(--color-foreground)] mb-2">스마트 팩토리</h3>
              <p className="text-sm text-[var(--color-muted)]">
                PLC, 센서, 계측기 데이터를 실시간 수집하여 생산 현황 모니터링 및 품질 관리
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-medium text-[var(--color-foreground)] mb-2">에너지 관리</h3>
              <p className="text-sm text-[var(--color-muted)]">
                전력 미터, 환경 센서 데이터를 수집하여 에너지 사용량 분석 및 최적화
              </p>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <div className="text-3xl mb-4">🔧</div>
              <h3 className="font-medium text-[var(--color-foreground)] mb-2">설비 예지보전</h3>
              <p className="text-sm text-[var(--color-muted)]">
                진동, 온도, 압력 데이터를 분석하여 설비 이상 징후 사전 감지
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-12">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] mb-4">
            Edge Gateway 도입 문의
          </h2>
          <p className="text-[var(--color-muted)] mb-8 max-w-xl mx-auto">
            현장 환경에 맞는 최적의 게이트웨이 구성을 제안해 드립니다.
            <br />
            프로토콜 지원 여부, 데이터 수집 주기 등 기술 상담도 가능합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] px-8 py-3 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90"
            >
              도입 문의하기
            </Link>
            <Link
              href="/solutions"
              className="rounded-full border border-[var(--color-border)] px-8 py-3 text-sm font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              다른 솔루션 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
