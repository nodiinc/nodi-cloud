import Link from "next/link";

const PERFORMANCE_SPECS = [
  { label: "처리량", value: "100K+", unit: "태그/초" },
  { label: "지연 시간", value: "<1", unit: "ms" },
  { label: "CPU 사용량", value: "~15%", unit: "싱글코어" },
  { label: "메모리", value: "~50", unit: "MB/10만태그" },
];

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "초고속 데이터 교환",
    description: "공유 메모리 기반 제로카피 아키텍처로 초당 100,000+ 태그 처리. 네트워크 스택 없이 마이크로초 단위 지연.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: "개별 태그 중심",
    description: "배칭 없이 태그 하나하나를 개별적으로 읽고 쓰기. 1개든 100,000개든 같은 API, 같은 속도.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "독립 프로세스 통신",
    description: "부모-자식 관계 없이 완전히 독립된 프로세스 간 통신. 한 앱이 죽어도 다른 앱에 영향 없음.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "메시지 손실 제로",
    description: "시퀀스 기반 갭 감지와 자동 복구. 누락된 데이터를 감지하고 재전송을 요청—투명하게.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "스토리지 친화적",
    description: "지속적 디스크 I/O 없이 메모리에서 운영. 필요할 때만 스냅샷. SD카드, eMMC 수명 연장.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "OS 무관",
    description: "Linux (x86, ARM, RISC-V), Windows, POSIX 호환 시스템 모두 지원. 같은 코드, 같은 성능.",
  },
];

const COMPARISONS = [
  {
    title: "vs. Redis / 인메모리 DB",
    items: [
      { aspect: "데이터 모델", other: "키-밸류 스토어", tagbus: "VTQ(값, 타임스탬프, 품질) 태그" },
      { aspect: "동기화", other: "폴링 또는 pub/sub 설정", tagbus: "자동 패턴 기반 싱크" },
      { aspect: "장애 감지", other: "수동 구현", tagbus: "하트비트 & 품질 지표 내장" },
    ],
  },
  {
    title: "vs. MQTT / 메시지 브로커",
    items: [
      { aspect: "아키텍처", other: "중앙 브로커 프로세스 필요", tagbus: "브로커 없이 직접 통신" },
      { aspect: "지연 시간", other: "네트워크 왕복", tagbus: "공유 메모리 (마이크로초)" },
      { aspect: "메시지 손실", other: "QoS 트레이드오프", tagbus: "시퀀스 기반 자동 복구" },
    ],
  },
];

const USE_CASES = [
  {
    icon: "🤖",
    title: "엣지 AI 디바이스",
    description: "비전 검사, 예지보전, 실시간 추론 시스템의 데이터 허브. 카메라, 추론 엔진, 리포터 간 고속 데이터 교환.",
  },
  {
    icon: "🏭",
    title: "산업용 엣지 게이트웨이",
    description: "PLC, 센서, HMI, SCADA 데이터를 통합 태그 공간으로 수집. 로컬 처리 후 클라우드 전달.",
  },
  {
    icon: "🔄",
    title: "디지털 트윈",
    description: "시뮬레이션, 모니터링, 제어 애플리케이션 간 동기화된 상태 유지.",
  },
  {
    icon: "📦",
    title: "멀티 프로세스 아키텍처",
    description: "모놀리식 애플리케이션을 마이크로서비스로 분리. 상태 공유가 손쉬움.",
  },
];

const SDK_SUPPORT = [
  { lang: "Python", status: "지원 중", version: "3.9+" },
  { lang: "C++", status: "지원 중", version: "C++17" },
];

export default function TagBusPage() {
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
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-5xl mb-4">
            TagBus
          </h1>
          <p className="text-xl text-[var(--color-accent)] font-medium mb-6">
            초고속 호스트 내부 데이터 교환 SDK
          </p>
          <p className="text-lg text-[var(--color-muted)] max-w-3xl mx-auto leading-relaxed">
            엔트리급 엣지 디바이스에서 <span className="text-[var(--color-foreground)] font-semibold">초당 100,000+ 태그</span>.
            메시지 손실 없음.
            <br className="hidden md:block" />
            단일 호스트에서 여러 애플리케이션이 실시간 데이터를 공유할 수 있는 개별 태그 중심 동기화 SDK.
          </p>

          {/* Performance Specs */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {PERFORMANCE_SPECS.map((spec) => (
              <div
                key={spec.label}
                className="px-6 py-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]"
              >
                <div className="flex items-baseline gap-1 justify-center">
                  <span className="text-3xl font-semibold text-[var(--color-accent)]">{spec.value}</span>
                  <span className="text-sm text-[var(--color-muted)]">{spec.unit}</span>
                </div>
                <div className="text-sm text-[var(--color-muted)] mt-1">{spec.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Diagram */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] text-center mb-8">
            공유 태그 공간
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 font-mono text-sm">
              <pre className="text-[var(--color-muted)] overflow-x-auto">
{`┌───────────────────────────────────────────────────────────────────────┐
│                           공유 태그 공간                                │
│                                                                       │
│   modbus/temp        vision/defect_count     inference/result         │
│   ├─ v: 25.5         ├─ v: 3                 ├─ v: "OK"               │
│   ├─ t: 1706123456   ├─ t: 1706123457        ├─ t: 1706123458         │
│   └─ q: good         └─ q: good              └─ q: good               │
│                                                                       │
│        ▲           ▲           ▲           ▲           ▲              │
│   ┌────┴────┐ ┌────┴────┐ ┌────┴────┐ ┌────┴────┐ ┌────┴────┐        │
│   │ Modbus  │ │ 카메라  │ │  추론   │ │ 클라우드│ │  로깅   │        │
│   │ 인터페  │ │ 인터페  │ │  엔진   │ │  커넥터 │ │ 에이전트│        │
│   └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘        │
│                                                                       │
│            모든 앱이 동등합니다. 자유롭게 읽고, 쓰고, 싱크합니다.         │
└───────────────────────────────────────────────────────────────────────┘`}
              </pre>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] text-center mb-12">
            핵심 기능
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

        {/* Code Example */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] text-center mb-4">
            간단한 API
          </h2>
          <p className="text-center text-[var(--color-muted)] mb-8">
            토픽 설계, 스키마 정의 없이 바로 사용
          </p>
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden">
              <div className="px-4 py-2 border-b border-[var(--color-border)] text-sm font-medium text-[var(--color-muted)]">
                데이터 발행
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-[var(--color-foreground)]">{`from tagbus import TagBus

bus = TagBus(app_id="sensor")
bus.connect()

bus.set_tags({
    "sensor/temperature": 25.5,
    "sensor/humidity": 60,
})
bus.commit()`}</code>
              </pre>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden">
              <div className="px-4 py-2 border-b border-[var(--color-border)] text-sm font-medium text-[var(--color-muted)]">
                데이터 싱크
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-[var(--color-foreground)]">{`from tagbus import TagBus

bus = TagBus(app_id="monitor")
bus.connect()

bus.sync_tags(["sensor/**"])
bus.commit()

tags = bus.get_tags()`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Comparisons */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] text-center mb-12">
            기존 솔루션과 비교
          </h2>
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {COMPARISONS.map((comparison) => (
              <div
                key={comparison.title}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-[var(--color-border)]">
                  <h3 className="font-medium text-[var(--color-foreground)]">{comparison.title}</h3>
                </div>
                <div className="p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-[var(--color-muted)]">
                        <th className="text-left pb-2 font-normal"></th>
                        <th className="text-left pb-2 font-normal">기존</th>
                        <th className="text-left pb-2 font-normal text-[var(--color-accent)]">TagBus</th>
                      </tr>
                    </thead>
                    <tbody className="text-[var(--color-foreground)]">
                      {comparison.items.map((item) => (
                        <tr key={item.aspect} className="border-t border-[var(--color-border)]">
                          <td className="py-2 pr-4 text-[var(--color-muted)]">{item.aspect}</td>
                          <td className="py-2 pr-4">{item.other}</td>
                          <td className="py-2 text-[var(--color-accent)]">{item.tagbus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] text-center mb-12">
            적용 분야
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {USE_CASES.map((useCase) => (
              <div
                key={useCase.title}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6"
              >
                <div className="text-3xl mb-4">{useCase.icon}</div>
                <h3 className="font-medium text-[var(--color-foreground)] mb-2">{useCase.title}</h3>
                <p className="text-sm text-[var(--color-muted)]">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SDK Support */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] text-center mb-8">
            SDK 지원
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {SDK_SUPPORT.map((sdk) => (
              <div
                key={sdk.lang}
                className="px-6 py-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-center"
              >
                <div className="text-lg font-semibold text-[var(--color-foreground)]">{sdk.lang}</div>
                <div className="text-sm text-[var(--color-accent)]">{sdk.status}</div>
                <div className="text-xs text-[var(--color-muted)] mt-1">{sdk.version}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[var(--color-muted)] mt-6">
            언어 독립적 아키텍처로 다른 언어 바인딩 확장 가능
          </p>
        </section>

        {/* Installation */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] text-center mb-8">
            설치
          </h2>
          <div className="grid gap-4 md:grid-cols-2 max-w-3xl mx-auto">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden">
              <div className="px-4 py-2 border-b border-[var(--color-border)] text-sm font-medium text-[var(--color-muted)]">
                Python
              </div>
              <pre className="p-4 text-sm">
                <code className="text-[var(--color-accent)]">pip install nodi-tagbus</code>
              </pre>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden">
              <div className="px-4 py-2 border-b border-[var(--color-border)] text-sm font-medium text-[var(--color-muted)]">
                C++ (Debian/Ubuntu)
              </div>
              <pre className="p-4 text-sm">
                <code className="text-[var(--color-accent)]">sudo apt install nodi-tagbus-dev</code>
              </pre>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-12">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] mb-4">
            고성능 엣지 데이터 아키텍처를 시작하세요
          </h2>
          <p className="text-[var(--color-muted)] mb-8 max-w-xl mx-auto">
            평가판과 기업 지원에 대해 문의하세요.
            <br />
            기술 상담 및 PoC 지원도 가능합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] px-8 py-3 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90"
            >
              문의하기
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
