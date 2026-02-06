import {
  Button,
  PageHeader,
  SectionLabel,
  CardGrid,
  CTACard,
  Card,
  StatCard,
  IconBox,
  CheckList,
  SectionTitle,
  Title,
  Body,
  Small,
  Badge,
  ImagePlaceholderIcon,
} from "@/components/ui";

const SYSTEM_COMPONENTS = [
  {
    layer: "필드 레벨",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    items: [
      { name: "PLC/DCS", desc: "생산 설비 제어 시스템" },
      { name: "센서/계측기", desc: "온도, 압력, 유량, 진동 등" },
      { name: "전력 미터", desc: "전력량계, 멀티미터" },
      { name: "HMI/SCADA", desc: "현장 모니터링 시스템" },
    ],
  },
  {
    layer: "엣지 레벨",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    items: [
      { name: "Edge Gateway", desc: "프로토콜 변환 및 데이터 통합" },
      { name: "TagBus", desc: "고속 데이터 버스" },
      { name: "로컬 DB", desc: "에지 데이터 버퍼링" },
      { name: "엣지 연산", desc: "전처리 및 필터링" },
    ],
  },
  {
    layer: "클라우드/서버 레벨",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    items: [
      { name: "MQTT/Kafka", desc: "메시지 브로커" },
      { name: "시계열 DB", desc: "InfluxDB, TimescaleDB" },
      { name: "분석 플랫폼", desc: "데이터 분석 및 ML" },
      { name: "대시보드", desc: "모니터링 및 시각화" },
    ],
  },
];

const SUPPORTED_PROTOCOLS = [
  { name: "Modbus TCP/RTU", category: "산업 표준" },
  { name: "OPC UA/DA", category: "산업 표준" },
  { name: "Ethernet/IP", category: "산업 표준" },
  { name: "BACnet", category: "빌딩 자동화" },
  { name: "MQTT", category: "IoT" },
  { name: "Sparkplug B", category: "IIoT" },
  { name: "REST/HTTP", category: "IT 표준" },
  { name: "SQL", category: "데이터베이스" },
];

const USE_CASES = [
  {
    title: "에너지 관리 시스템 (EMS)",
    desc: "전력, 가스, 용수 등 에너지 사용량 실시간 모니터링 및 분석",
    features: [
      "전력량계 실시간 데이터 수집",
      "피크 전력 관리 및 알림",
      "에너지 사용량 리포팅",
      "탄소 배출량 계산",
    ],
  },
  {
    title: "설비 상태 모니터링",
    desc: "생산 설비의 가동 상태 및 이상 징후 실시간 감시",
    features: [
      "설비 가동률 (OEE) 분석",
      "진동/온도 기반 이상 감지",
      "예지 정비 데이터 수집",
      "알람 및 이벤트 관리",
    ],
  },
  {
    title: "공정 데이터 수집",
    desc: "생산 공정의 주요 파라미터 수집 및 품질 관리",
    features: [
      "공정 변수 실시간 수집",
      "SPC/SQC 데이터 연동",
      "배치 데이터 관리",
      "트레이서빌리티 지원",
    ],
  },
  {
    title: "환경 모니터링",
    desc: "작업 환경 및 배출 데이터 모니터링 및 규제 대응",
    features: [
      "대기/수질 오염 측정",
      "소음/분진 모니터링",
      "환경 규제 리포팅",
      "이상 발생 시 자동 알림",
    ],
  },
];

const IMPLEMENTATION_STEPS = [
  {
    phase: "1단계",
    title: "현황 분석",
    duration: "1-2주",
    tasks: [
      "수집 대상 설비/시스템 파악",
      "기존 네트워크 인프라 분석",
      "데이터 포인트 정의",
      "보안 요구사항 검토",
    ],
  },
  {
    phase: "2단계",
    title: "설계",
    duration: "2-3주",
    tasks: [
      "시스템 아키텍처 설계",
      "H/W, S/W 사양 결정",
      "네트워크 설계",
      "데이터 모델 정의",
    ],
  },
  {
    phase: "3단계",
    title: "구축",
    duration: "3-4주",
    tasks: [
      "Edge Gateway 설치",
      "필드 장비 연동",
      "서버/클라우드 연동",
      "대시보드 구성",
    ],
  },
  {
    phase: "4단계",
    title: "시운전",
    duration: "1-2주",
    tasks: [
      "데이터 수집 검증",
      "알람 테스트",
      "사용자 교육",
      "인수 테스트",
    ],
  },
];

const BENEFITS = [
  {
    title: "통합 데이터 수집",
    desc: "이기종 장비의 데이터를 단일 플랫폼으로 통합",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    title: "실시간 모니터링",
    desc: "현장 데이터를 실시간으로 수집하고 시각화",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "확장성",
    desc: "수집 포인트 및 시스템 확장이 용이한 구조",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: "안정성",
    desc: "자동 복구 및 버퍼링으로 데이터 손실 방지",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function DataCollectionPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          badge="Service"
          title="데이터 수집 시스템 구축"
          description="Edge Gateway를 활용하여 현장의 다양한 설비와 시스템에서 데이터를 수집하고, 클라우드 또는 온프레미스 서버로 전송하는 통합 데이터 수집 시스템을 구축합니다."
        />

        {/* Benefits */}
        <CardGrid cols={2} mdCols={4} gap="sm" className="mb-20">
          {BENEFITS.map((benefit) => (
            <StatCard
              key={benefit.title}
              icon={benefit.icon}
              value={benefit.title}
              label={benefit.desc}
            />
          ))}
        </CardGrid>

        {/* System Architecture */}
        <section className="mb-20">
          <SectionLabel>시스템 아키텍처</SectionLabel>
          <CardGrid cols={1} mdCols={3}>
            {SYSTEM_COMPONENTS.map((component) => (
              <Card key={component.layer} size="md">
                <div className="flex items-center gap-3 mb-4">
                  <IconBox variant="default">{component.icon}</IconBox>
                  <Title>{component.layer}</Title>
                </div>
                <div className="space-y-3">
                  {component.items.map((item) => (
                    <div key={item.name} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 flex-shrink-0" />
                      <div>
                        <Small className="font-medium text-[var(--color-foreground)]">{item.name}</Small>
                        <Small className="block">{item.desc}</Small>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </CardGrid>

          {/* Architecture Diagram Placeholder */}
          <Card size="lg" className="mt-8">
            <div className="aspect-[21/9] rounded-xl bg-[var(--color-background)] border border-dashed border-[var(--color-border)] flex items-center justify-center">
              <div className="text-center">
                <ImagePlaceholderIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <Body>데이터 수집 시스템 아키텍처 다이어그램</Body>
                <Small className="mt-1">(다이어그램 이미지 영역)</Small>
              </div>
            </div>
          </Card>
        </section>

        {/* Supported Protocols */}
        <section className="mb-20">
          <SectionLabel>지원 프로토콜</SectionLabel>
          <CardGrid cols={2} mdCols={4} gap="sm">
            {SUPPORTED_PROTOCOLS.map((protocol) => (
              <Card key={protocol.name} variant="hover" size="sm" className="text-center">
                <Badge size="xs" className="mb-2">{protocol.category}</Badge>
                <Title as="span" className="text-sm">{protocol.name}</Title>
              </Card>
            ))}
          </CardGrid>
        </section>

        {/* Use Cases */}
        <section className="mb-20">
          <SectionLabel>적용 분야</SectionLabel>
          <CardGrid cols={1} mdCols={2}>
            {USE_CASES.map((useCase) => (
              <Card key={useCase.title} size="md">
                <Title className="mb-2">{useCase.title}</Title>
                <Body className="mb-4">{useCase.desc}</Body>
                <div className="grid grid-cols-2 gap-2">
                  {useCase.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <Small className="text-[var(--color-muted)]">{feature}</Small>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </CardGrid>
        </section>

        {/* Implementation Steps */}
        <section className="mb-20">
          <SectionLabel>구축 프로세스</SectionLabel>
          <CardGrid cols={1} mdCols={4} gap="sm">
            {IMPLEMENTATION_STEPS.map((step, index) => (
              <div key={step.phase} className="relative">
                <Card size="md">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] text-black">
                      {step.phase}
                    </span>
                    <Small>{step.duration}</Small>
                  </div>
                  <Title className="mb-3">{step.title}</Title>
                  <ul className="space-y-2">
                    {step.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--color-accent)] mt-0.5">•</span>
                        <Small>{task}</Small>
                      </li>
                    ))}
                  </ul>
                </Card>
                {index < IMPLEMENTATION_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <svg className="w-4 h-4 text-[var(--color-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </CardGrid>
        </section>

        {/* CTA */}
        <CTACard
          title="구축 상담"
          description={
            <>
              현장 환경과 요구사항에 맞는 최적의 데이터 수집 시스템을 제안해 드립니다.
              <br />
              기술 상담부터 구축, 유지보수까지 원스톱 서비스를 제공합니다.
            </>
          }
        >
          <Button href="/contact">구축 상담 요청</Button>
          <Button href="/solutions/edge-gateway" variant="secondary">Edge Gateway 알아보기</Button>
        </CTACard>
      </div>
    </div>
  );
}
