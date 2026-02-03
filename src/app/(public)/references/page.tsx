import Image from "next/image";
import Link from "next/link";

const CLIENTS = [
  {
    name: "HD현대일렉트릭",
    logo: "/clients/hd-hyundai-electric.png",
  },
  {
    name: "한국전자통신연구원",
    logo: "/clients/etri.png",
  },
  {
    name: "한국생산기술연구원",
    logo: "/clients/kitech.png",
  },
  {
    name: "CJ대한통운",
    logo: "/clients/cj-logistics.png",
  },
];

const PROJECTS = [
  {
    title: "한솔제지 EIS/EOS 인프라 구축",
    client: "한솔제지",
    category: "에너지 관리",
    year: "2024",
    description: "전력미터 설치 및 엣지 게이트웨이 기반 에너지 정보 시스템 구축",
    details: [
      "전력미터 설치 및 Modbus TCP 기반 전력 데이터 수집",
      "OPC DA/OPC UA를 통한 기존 PI 시스템 데이터 연동",
      "InfluxDB 기반 EIS 서버 데이터 저장 및 분석",
      "실시간 에너지 사용량 모니터링 대시보드 구축",
    ],
    technologies: ["Edge Gateway", "Modbus TCP", "OPC UA", "OPC DA", "InfluxDB"],
  },
  {
    title: "스마트 팩토리 데이터 수집 시스템",
    client: "HD현대일렉트릭",
    category: "스마트 팩토리",
    year: "2024",
    description: "생산 설비 데이터 실시간 수집 및 클라우드 연동 시스템 구축",
    details: [
      "PLC/HMI 데이터 OPC UA 기반 실시간 수집",
      "Sparkplug B 프로토콜 기반 클라우드 데이터 전송",
      "설비 가동률 및 생산량 실시간 모니터링",
      "이상 징후 감지 및 알림 시스템 구축",
    ],
    technologies: ["Edge Gateway", "OPC UA", "Sparkplug B", "MQTT"],
  },
  {
    title: "연구 장비 데이터 통합 플랫폼",
    client: "한국생산기술연구원",
    category: "연구개발",
    year: "2023",
    description: "다양한 연구 장비의 데이터를 통합 관리하는 플랫폼 구축",
    details: [
      "이기종 장비 멀티 프로토콜 데이터 수집",
      "시계열 데이터베이스 기반 장기 데이터 보관",
      "연구 데이터 분석 및 시각화 대시보드",
      "REST API 기반 외부 시스템 연동",
    ],
    technologies: ["Edge Gateway", "Modbus", "REST API", "InfluxDB"],
  },
];

const STATS = [
  { value: "50+", label: "프로젝트 수행" },
  { value: "30+", label: "고객사" },
  { value: "1000+", label: "연결 장비" },
  { value: "99.9%", label: "가동률" },
];

export default function ReferencesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-5xl mb-6">
            References
          </h1>
          <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            다양한 산업 분야의 고객사와 함께 성공적인 프로젝트를 수행하고 있습니다
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]"
            >
              <div className="text-3xl font-semibold text-[var(--color-accent)] mb-1">{stat.value}</div>
              <div className="text-sm text-[var(--color-muted)]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Clients */}
        <section className="mb-24">
          <h2 className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-8 text-center">
            주요 고객사
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                className="flex flex-col items-center justify-center p-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-brand-cyan)]/30 transition-colors"
              >
                {/* Logo placeholder - replace with actual logos */}
                <div className="w-24 h-16 rounded-lg bg-[var(--color-background)] flex items-center justify-center mb-4">
                  <span className="text-xs text-[var(--color-muted)] text-center px-2">
                    {client.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-[var(--color-foreground)] text-center">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[var(--color-muted)] mt-6">
            * 로고는 고객사 승인 후 게시됩니다
          </p>
        </section>

        {/* Projects */}
        <section className="mb-24">
          <h2 className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-8 text-center">
            주요 프로젝트
          </h2>
          <div className="space-y-6">
            {PROJECTS.map((project) => (
              <div
                key={project.title}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 md:p-8 hover:border-[var(--color-brand-cyan)]/30 transition-colors"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                        {project.category}
                      </span>
                      <span className="text-sm text-[var(--color-muted)]">{project.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--color-foreground)]">
                      {project.title}
                    </h3>
                    <p className="text-[var(--color-muted)] mt-1">{project.client}</p>
                  </div>
                </div>

                <p className="text-[var(--color-muted)] mb-4">{project.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-[var(--color-foreground)] mb-2">주요 내용</h4>
                  <ul className="space-y-1">
                    {project.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                        <span className="text-[var(--color-accent)] mt-1">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--color-background)] text-[var(--color-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-12">
          <h2 className="text-2xl font-semibold text-[var(--color-foreground)] mb-4">
            프로젝트 문의
          </h2>
          <p className="text-[var(--color-muted)] mb-8 max-w-xl mx-auto">
            귀사의 요구사항에 맞는 맞춤형 솔루션을 제안해 드립니다.
            <br />
            기술 상담 및 견적 문의를 환영합니다.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] px-8 py-3 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90"
          >
            문의하기
          </Link>
        </div>
      </div>
    </div>
  );
}
