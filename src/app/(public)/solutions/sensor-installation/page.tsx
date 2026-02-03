import Link from "next/link";

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
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "전문 설치",
    desc: "산업 현장 경험이 풍부한 엔지니어의 전문 설치",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "신속한 대응",
    desc: "현장 상황에 맞는 유연하고 신속한 설치 서비스",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "완벽한 문서화",
    desc: "설치 도면, 배선도, 설정값 등 완벽한 문서 제공",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "유지보수 지원",
    desc: "설치 후 지속적인 기술 지원 및 유지보수 서비스",
  },
];

export default function SensorInstallationPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
            Service
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-5xl mb-6">
            센서·계측기 설치
          </h1>
          <p className="text-lg text-[var(--color-muted)] max-w-3xl mx-auto">
            산업 현장의 다양한 측정 요구사항에 맞는 센서 및 계측기를 설치하고,
            Edge Gateway와 연동하여 실시간 데이터 수집 환경을 구축합니다.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="text-center p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-3">
                {benefit.icon}
              </div>
              <div className="text-sm font-semibold text-[var(--color-foreground)] mb-1">{benefit.title}</div>
              <div className="text-xs text-[var(--color-muted)]">{benefit.desc}</div>
            </div>
          ))}
        </div>

        {/* Sensor Types */}
        <section className="mb-20">
          <h2 className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-8 text-center">
            지원 센서 및 계측기
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {SENSOR_TYPES.map((category) => (
              <div
                key={category.category}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6"
              >
                <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <div key={item.name} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-[var(--color-foreground)]">{item.name}</div>
                        <div className="text-xs text-[var(--color-muted)]">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Communication Protocols */}
        <section className="mb-20">
          <h2 className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-8 text-center">
            지원 통신 프로토콜
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {COMMUNICATION_PROTOCOLS.map((protocol) => (
              <div
                key={protocol.name}
                className="text-center p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-brand-cyan)]/30 transition-colors"
              >
                <span className="inline-block px-2 py-0.5 text-[10px] font-medium rounded bg-[var(--color-background)] text-[var(--color-muted)] mb-2">
                  {protocol.type}
                </span>
                <div className="text-sm font-semibold text-[var(--color-foreground)]">{protocol.name}</div>
                <div className="text-xs text-[var(--color-muted)] mt-1">{protocol.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Installation Process */}
        <section className="mb-20">
          <h2 className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-8 text-center">
            설치 프로세스
          </h2>
          <div className="space-y-4">
            {INSTALLATION_PROCESS.map((step, index) => (
              <div
                key={step.step}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] flex items-center justify-center text-lg font-bold text-black">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[var(--color-muted)] mb-4">{step.desc}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                          <svg className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Integration Diagram Placeholder */}
        <section className="mb-20">
          <h2 className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-8 text-center">
            시스템 연동 구성
          </h2>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8">
            <div className="aspect-[16/9] max-w-4xl mx-auto rounded-xl bg-[var(--color-background)] border border-dashed border-[var(--color-border)] flex items-center justify-center">
              <div className="text-center text-[var(--color-muted)]">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">센서 → Edge Gateway → 클라우드 연동 구성도</p>
                <p className="text-xs mt-1">(다이어그램 이미지 영역)</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-12">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] mb-4">
            설치 문의
          </h2>
          <p className="text-[var(--color-muted)] mb-8 max-w-xl mx-auto">
            현장 환경에 맞는 최적의 센서 및 계측기 설치 방안을 제안해 드립니다.
            <br />
            현장 조사부터 설치, 교정까지 원스톱 서비스를 제공합니다.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] px-8 py-3 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90"
          >
            설치 상담 요청
          </Link>
        </div>
      </div>
    </div>
  );
}
