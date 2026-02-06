import {
  Button,
  Section,
  SectionHeader,
  FeatureCard,
  CTACard,
  CardGrid,
  Card,
  Display,
  Body,
  Small,
  GradientText,
  Code,
} from "@/components/ui";
import DevBanner from "@/components/DevBanner";

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
      <DevBanner />

      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[var(--color-brand-blue)]/10 to-[var(--color-brand-cyan)]/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <Display>
            제조 AI 도입,
            <br />
            <GradientText>데이터 수집이 첫걸음입니다</GradientText>
          </Display>
          <Body className="mx-auto mt-6 max-w-2xl text-base md:text-lg">
            제조 AI 도입이 가속화되고 있지만,
            많은 현장에서는 AI 모델 구축을 위한 데이터 인프라가 갖춰지지 않은 상황입니다.
            <br className="hidden md:block" />
            Nodi는 산업 현장에 특화된 데이터 수집 솔루션을 제공합니다.
          </Body>
          <div className="mt-10">
            <Button href="/solutions">솔루션 알아보기</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Section>
        <SectionHeader
          title="산업 현장을 위한 설계"
          description="현장 장비부터 클라우드까지, 데이터 수집에 필요한 모든 것을 제공합니다."
        />
        <CardGrid cols={1} mdCols={2} lgCols={3}>
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </CardGrid>
      </Section>

      {/* Protocols Section */}
      <Section withBorder>
        <SectionHeader
          title="다양한 프로토콜 지원"
          description="클라우드 메시징부터 필드버스까지, 하나의 플랫폼으로 연결합니다."
        />
        <CardGrid cols={1} mdCols={2} lgCols={5} gap="sm">
          {PROTOCOLS.map((protocol) => (
            <Card key={protocol.name} variant="hover" size="sm" className="text-center">
              <Code className="text-[var(--color-foreground)]">{protocol.name}</Code>
              <Small className="block mt-1">{protocol.category}</Small>
            </Card>
          ))}
        </CardGrid>
      </Section>

      {/* CTA Section */}
      <Section withBorder>
        <CTACard
          title="AI 전환, 데이터 수집부터 시작하세요"
          description="현장 환경에 맞는 데이터 수집 방안을 함께 설계해 드립니다."
        >
          <Button href="/contact">상담 요청하기</Button>
        </CTACard>
      </Section>
    </>
  );
}
