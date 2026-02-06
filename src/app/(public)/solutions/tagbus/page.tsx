import {
  Button,
  PageHeader,
  SectionLabel,
  CardGrid,
  CTACard,
  Card,
  FeatureCard,
  IconBox,
  SectionTitle,
  Title,
  Body,
  Small,
  Code,
  LabelAccent,
} from "@/components/ui";
import { textStyles } from "@/config/fonts";

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

const APPS = [
  { name: "Modbus", sub: "인터페이스", icon: "M" },
  { name: "카메라", sub: "인터페이스", icon: "C" },
  { name: "추론", sub: "엔진", icon: "AI" },
  { name: "클라우드", sub: "커넥터", icon: "☁" },
  { name: "로깅", sub: "에이전트", icon: "L" },
];

export default function TagBusPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          backLink="/solutions"
          backLabel="Solutions"
          title="TagBus"
          subtitle="초고속 호스트 내부 데이터 교환 SDK"
          description={
            <>
              엔트리급 엣지 디바이스에서 <span className="text-[var(--color-foreground)] font-semibold">초당 100,000+ 태그</span>.
              메시지 손실 없음.
              <br className="hidden md:block" />
              단일 호스트에서 여러 애플리케이션이 실시간 데이터를 공유할 수 있는 개별 태그 중심 동기화 SDK.
            </>
          }
        />

        {/* Performance Specs */}
        <CardGrid cols={2} mdCols={4} gap="sm" className="mb-20">
          {PERFORMANCE_SPECS.map((spec) => (
            <Card key={spec.label} className="text-center">
              <div className="flex items-baseline gap-1 justify-center">
                <span className={`${textStyles.section} text-[var(--color-accent)]`}>{spec.value}</span>
                <Small>{spec.unit}</Small>
              </div>
              <Body className="mt-1">{spec.label}</Body>
            </Card>
          ))}
        </CardGrid>

        {/* Architecture Diagram */}
        <section className="mb-24">
          <SectionTitle className="text-center mb-8">공유 태그 공간</SectionTitle>
          <div className="max-w-5xl mx-auto">
            <Card size="lg">
              {/* Shared Tag Space Diagram */}
              <div className="relative">
                {/* Tag Space Container */}
                <div className="relative rounded-xl border-2 border-dashed border-[var(--color-brand-cyan)]/40 bg-gradient-to-b from-[var(--color-brand-cyan)]/5 to-transparent p-6 pb-32">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-brand-cyan)]/10 border border-[var(--color-brand-cyan)]/30">
                      <svg className="w-5 h-5 text-[var(--color-brand-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                      </svg>
                      <Small className="font-semibold text-[var(--color-brand-cyan)]">Shared Tag Space</Small>
                    </span>
                  </div>

                  {/* Tags Grid */}
                  <CardGrid cols={1} mdCols={3} gap="sm" className="mb-8">
                    {/* Tag 1 */}
                    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4">
                      <Code className="text-[var(--color-brand-cyan)] mb-2 block">modbus/temperature</Code>
                      <div className="space-y-1 text-xs font-mono">
                        <div className="flex justify-between">
                          <span className="text-[var(--color-muted)]">value</span>
                          <span className="text-[var(--color-foreground)]">25.5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--color-muted)]">timestamp</span>
                          <span className="text-[var(--color-foreground)]">1706123456</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--color-muted)]">quality</span>
                          <span className="text-green-400">good</span>
                        </div>
                      </div>
                    </div>

                    {/* Tag 2 */}
                    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4">
                      <Code className="text-[var(--color-brand-cyan)] mb-2 block">vision/defect_count</Code>
                      <div className="space-y-1 text-xs font-mono">
                        <div className="flex justify-between">
                          <span className="text-[var(--color-muted)]">value</span>
                          <span className="text-[var(--color-foreground)]">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--color-muted)]">timestamp</span>
                          <span className="text-[var(--color-foreground)]">1706123457</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--color-muted)]">quality</span>
                          <span className="text-green-400">good</span>
                        </div>
                      </div>
                    </div>

                    {/* Tag 3 */}
                    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4">
                      <Code className="text-[var(--color-brand-cyan)] mb-2 block">inference/result</Code>
                      <div className="space-y-1 text-xs font-mono">
                        <div className="flex justify-between">
                          <span className="text-[var(--color-muted)]">value</span>
                          <span className="text-[var(--color-foreground)]">&quot;OK&quot;</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--color-muted)]">timestamp</span>
                          <span className="text-[var(--color-foreground)]">1706123458</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--color-muted)]">quality</span>
                          <span className="text-green-400">good</span>
                        </div>
                      </div>
                    </div>
                  </CardGrid>

                  {/* Connection Lines SVG */}
                  <svg className="absolute left-0 right-0 bottom-24 h-16 w-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--color-brand-cyan)" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="var(--color-brand-cyan)" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    <line x1="10%" y1="100%" x2="10%" y2="0%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="30%" y1="100%" x2="30%" y2="0%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="50%" y1="100%" x2="50%" y2="0%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="70%" y1="100%" x2="70%" y2="0%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="90%" y1="100%" x2="90%" y2="0%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4 4" />
                  </svg>
                </div>

                {/* Applications Row */}
                <div className="grid grid-cols-5 gap-2 md:gap-4 -mt-8 relative z-10 px-2">
                  {APPS.map((app) => (
                    <div key={app.name} className="flex flex-col items-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] flex items-center justify-center text-black font-bold text-sm md:text-lg shadow-lg shadow-[var(--color-brand-cyan)]/20">
                        {app.icon}
                      </div>
                      <div className="mt-2 text-center">
                        <Small className="font-medium text-[var(--color-foreground)]">{app.name}</Small>
                        <Small className="block text-[10px] md:text-xs">{app.sub}</Small>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Text */}
                <div className="text-center mt-8 pt-4 border-t border-[var(--color-border)]">
                  <Body>
                    모든 앱이 <span className="text-[var(--color-accent)]">동등</span>합니다. 자유롭게 <span className="text-[var(--color-accent)]">읽고</span>, <span className="text-[var(--color-accent)]">쓰고</span>, <span className="text-[var(--color-accent)]">싱크</span>합니다.
                  </Body>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Features */}
        <section className="mb-24">
          <SectionTitle className="text-center mb-12">핵심 기능</SectionTitle>
          <CardGrid cols={1} mdCols={2} lgCols={3}>
            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={<IconBox>{feature.icon}</IconBox>}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </CardGrid>
        </section>

        {/* Code Example */}
        <section className="mb-24">
          <SectionTitle className="text-center mb-4">간단한 API</SectionTitle>
          <Body className="text-center mb-8">토픽 설계, 스키마 정의 없이 바로 사용</Body>
          <CardGrid cols={1} mdCols={2} className="max-w-5xl mx-auto">
            <Card className="overflow-hidden p-0">
              <div className="px-4 py-2 border-b border-[var(--color-border)]">
                <Small className="font-medium">데이터 발행</Small>
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
            </Card>
            <Card className="overflow-hidden p-0">
              <div className="px-4 py-2 border-b border-[var(--color-border)]">
                <Small className="font-medium">데이터 싱크</Small>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-[var(--color-foreground)]">{`from tagbus import TagBus

bus = TagBus(app_id="monitor")
bus.connect()

bus.sync_tags(["sensor/**"])
bus.commit()

tags = bus.get_tags()`}</code>
              </pre>
            </Card>
          </CardGrid>
        </section>

        {/* Comparisons */}
        <section className="mb-24">
          <SectionTitle className="text-center mb-12">기존 솔루션과 비교</SectionTitle>
          <CardGrid cols={1} mdCols={2} className="max-w-5xl mx-auto">
            {COMPARISONS.map((comparison) => (
              <Card key={comparison.title} className="overflow-hidden p-0">
                <div className="px-6 py-4 border-b border-[var(--color-border)]">
                  <Title>{comparison.title}</Title>
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
              </Card>
            ))}
          </CardGrid>
        </section>

        {/* Use Cases */}
        <section className="mb-24">
          <SectionTitle className="text-center mb-12">적용 분야</SectionTitle>
          <CardGrid cols={1} mdCols={2} lgCols={4}>
            {USE_CASES.map((useCase) => (
              <Card key={useCase.title} size="md">
                <div className="text-3xl mb-4">{useCase.icon}</div>
                <Title className="mb-2">{useCase.title}</Title>
                <Body>{useCase.description}</Body>
              </Card>
            ))}
          </CardGrid>
        </section>

        {/* SDK Support */}
        <section className="mb-24">
          <SectionTitle className="text-center mb-8">SDK 지원</SectionTitle>
          <div className="flex flex-wrap justify-center gap-4">
            {SDK_SUPPORT.map((sdk) => (
              <Card key={sdk.lang} className="text-center">
                <Title className="mb-1">{sdk.lang}</Title>
                <LabelAccent className="block">{sdk.status}</LabelAccent>
                <Small className="mt-1">{sdk.version}</Small>
              </Card>
            ))}
          </div>
          <Body className="text-center mt-6">
            언어 독립적 아키텍처로 다른 언어 바인딩 확장 가능
          </Body>
        </section>

        {/* Installation */}
        <section className="mb-24">
          <SectionTitle className="text-center mb-8">설치</SectionTitle>
          <CardGrid cols={1} mdCols={2} gap="sm" className="max-w-3xl mx-auto">
            <Card className="overflow-hidden p-0">
              <div className="px-4 py-2 border-b border-[var(--color-border)]">
                <Small className="font-medium">Python</Small>
              </div>
              <pre className="p-4 text-sm">
                <code className="text-[var(--color-accent)]">pip install nodi-tagbus</code>
              </pre>
            </Card>
            <Card className="overflow-hidden p-0">
              <div className="px-4 py-2 border-b border-[var(--color-border)]">
                <Small className="font-medium">C++ (Debian/Ubuntu)</Small>
              </div>
              <pre className="p-4 text-sm">
                <code className="text-[var(--color-accent)]">sudo apt install nodi-tagbus-dev</code>
              </pre>
            </Card>
          </CardGrid>
        </section>

        {/* CTA */}
        <CTACard
          title="고성능 엣지 데이터 아키텍처를 시작하세요"
          description={
            <>
              평가판과 기업 지원에 대해 문의하세요.
              <br />
              기술 상담 및 PoC 지원도 가능합니다.
            </>
          }
        >
          <Button href="/contact">문의하기</Button>
          <Button href="/solutions" variant="secondary">다른 솔루션 보기</Button>
        </CTACard>
      </div>
    </div>
  );
}
