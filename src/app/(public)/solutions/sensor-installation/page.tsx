import {
  Button,
  PageHeader,
  SectionLabel,
  CardGrid,
  CTACard,
  Card,
  StatCard,
  ProcessStepCard,
  DotList,
  Badge,
  Title,
  CheckCircleIcon,
  ClockIcon,
  DocumentIcon,
  SupportIcon,
} from "@/components/ui";

const SENSOR_TYPES = [
  {
    category: "전력 계측",
    items: [
      { name: "전력량계 (kWh Meter)", desc: "유효/무효 전력량, 역률, 고조파 측정" },
      { name: "전류 변성기 (CT)", desc: "대전류 측정을 위한 변환 장치" },
      { name: "전압 변성기 (PT)", desc: "고전압 측정을 위한 변환 장치" },
      { name: "멀티미터", desc: "전압, 전류, 전력, 역률 통합 측정" },
    ],
  },
  {
    category: "환경 계측",
    items: [
      { name: "온도 센서", desc: "RTD, 열전대, 서미스터 기반 온도 측정" },
      { name: "습도 센서", desc: "상대습도 및 절대습도 측정" },
      { name: "압력 센서", desc: "공압, 수압, 진공압 측정" },
      { name: "유량계", desc: "액체/기체 유량 측정 (전자식, 초음파식)" },
    ],
  },
  {
    category: "설비 상태 계측",
    items: [
      { name: "진동 센서", desc: "회전체 진동 및 베어링 상태 모니터링" },
      { name: "초음파 센서", desc: "레벨 측정, 거리 측정, 누설 감지" },
      { name: "적외선 센서", desc: "비접촉 온도 측정, 열화상 분석" },
      { name: "전류 센서", desc: "모터 전류 분석을 통한 상태 진단" },
    ],
  },
];

const INSTALLATION_PROCESS = [
  {
    step: "01",
    title: "현장 조사",
    desc: "설치 환경 분석 및 측정 포인트 선정",
    details: [
      "기존 설비 및 배관 구조 파악",
      "전원 공급 및 통신 환경 확인",
      "측정 대상 및 범위 정의",
      "설치 위치 및 방법 검토",
    ],
  },
  {
    step: "02",
    title: "설계 및 계획",
    desc: "센서 선정 및 설치 도면 작성",
    details: [
      "측정 요구사항에 맞는 센서 선정",
      "신호 타입 및 통신 프로토콜 결정",
      "배선 경로 및 설치 도면 작성",
      "필요 자재 및 공구 목록 작성",
    ],
  },
  {
    step: "03",
    title: "설치 및 배선",
    desc: "센서 설치 및 신호 배선 작업",
    details: [
      "센서 브라켓 및 하우징 설치",
      "신호 케이블 배선 및 단말 처리",
      "전원 공급 및 접지 연결",
      "노이즈 차폐 및 서지 보호",
    ],
  },
  {
    step: "04",
    title: "연결 및 설정",
    desc: "게이트웨이 연결 및 파라미터 설정",
    details: [
      "Edge Gateway 입력 채널 연결",
      "스케일링 및 오프셋 설정",
      "샘플링 주기 및 필터 설정",
      "알람 임계값 설정",
    ],
  },
  {
    step: "05",
    title: "검증 및 교정",
    desc: "측정값 검증 및 센서 교정",
    details: [
      "기준 장비와 측정값 비교",
      "센서 교정 및 보정 작업",
      "데이터 수집 안정성 확인",
      "문서화 및 인수 테스트",
    ],
  },
];

const COMMUNICATION_PROTOCOLS = [
  { name: "4-20mA", desc: "산업 표준 아날로그 전류 신호", type: "Analog" },
  { name: "0-10V", desc: "아날로그 전압 신호", type: "Analog" },
  { name: "RS-485", desc: "멀티드롭 시리얼 통신", type: "Serial" },
  { name: "Modbus RTU", desc: "시리얼 기반 산업 프로토콜", type: "Serial" },
  { name: "Modbus TCP", desc: "이더넷 기반 산업 프로토콜", type: "Ethernet" },
  { name: "Ethernet/IP", desc: "산업용 이더넷 프로토콜", type: "Ethernet" },
];

const BENEFITS = [
  { icon: <CheckCircleIcon />, title: "전문 설치", desc: "산업 현장 경험이 풍부한 엔지니어의 전문 설치" },
  { icon: <ClockIcon />, title: "신속한 대응", desc: "현장 상황에 맞는 유연하고 신속한 설치 서비스" },
  { icon: <DocumentIcon />, title: "완벽한 문서화", desc: "설치 도면, 배선도, 설정값 등 완벽한 문서 제공" },
  { icon: <SupportIcon />, title: "유지보수 지원", desc: "설치 후 지속적인 기술 지원 및 유지보수 서비스" },
];

export default function SensorInstallationPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          badge="Service"
          title="센서 · 계측기 설치"
          description="산업 현장의 다양한 측정 요구사항에 맞는 센서 및 계측기를 설치하고, Edge Gateway와 연동하여 실시간 데이터 수집 환경을 구축합니다."
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

        {/* Sensor Types */}
        <section className="mb-20">
          <SectionLabel>지원 센서 및 계측기</SectionLabel>
          <CardGrid cols={1} mdCols={3}>
            {SENSOR_TYPES.map((category) => (
              <Card key={category.category} size="md">
                <Title className="mb-4">{category.category}</Title>
                <DotList items={category.items} />
              </Card>
            ))}
          </CardGrid>
        </section>

        {/* Communication Protocols */}
        <section className="mb-20">
          <SectionLabel>지원 통신 프로토콜</SectionLabel>
          <CardGrid cols={2} mdCols={3} lgCols={6} gap="sm">
            {COMMUNICATION_PROTOCOLS.map((protocol) => (
              <Card key={protocol.name} variant="hover" size="sm" className="text-center">
                <Badge size="xs" className="mb-2">{protocol.type}</Badge>
                <div className="text-sm font-semibold text-[var(--color-foreground)]">{protocol.name}</div>
                <div className="text-xs text-[var(--color-muted)] mt-1">{protocol.desc}</div>
              </Card>
            ))}
          </CardGrid>
        </section>

        {/* Installation Process */}
        <section className="mb-20">
          <SectionLabel>설치 프로세스</SectionLabel>
          <div className="space-y-4">
            {INSTALLATION_PROCESS.map((step) => (
              <ProcessStepCard
                key={step.step}
                step={step.step}
                title={step.title}
                description={step.desc}
                details={step.details}
              />
            ))}
          </div>
        </section>

        {/* Integration Diagram Placeholder */}
        <section className="mb-20">
          <SectionLabel>시스템 연동 구성</SectionLabel>
          <Card size="lg">
            <div className="aspect-[16/9] max-w-4xl mx-auto rounded-xl bg-[var(--color-background)] border border-dashed border-[var(--color-border)] flex items-center justify-center">
              <div className="text-center text-[var(--color-muted)]">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">센서 → Edge Gateway → 클라우드 연동 구성도</p>
                <p className="text-xs mt-1">(다이어그램 이미지 영역)</p>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA */}
        <CTACard
          title="설치 문의"
          description={
            <>
              현장 환경에 맞는 최적의 센서 및 계측기 설치 방안을 제안해 드립니다.
              <br />
              현장 조사부터 설치, 교정까지 원스톱 서비스를 제공합니다.
            </>
          }
        >
          <Button href="/contact">설치 상담 요청</Button>
        </CTACard>
      </div>
    </div>
  );
}
