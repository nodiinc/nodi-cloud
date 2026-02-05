import Link from "next/link";
import {
  Button,
  PageHeader,
  SectionLabel,
  CardGrid,
  Tag,
  Title,
  Body,
} from "@/components/ui";

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
];

const PLATFORM = [
  {
    name: "Nodi Cloud",
    href: "/platform",
    description: "엣지 게이트웨이를 원격으로 관리하고 모니터링하는 클라우드 플랫폼",
    features: ["원격 모니터링", "설정 관리", "대시보드"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
];

const SERVICES = [
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
  {
    name: "센서 · 계측기 설치",
    href: "/solutions/sensor-installation",
    description: "전력, 환경, 설비 상태 계측을 위한 센서 및 계측기 설치 서비스",
    features: ["현장 조사", "설치 및 배선", "검증 및 교정"],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
];

interface SolutionCardProps {
  href: string;
  icon: React.ReactNode;
  name: string;
  description: string;
  features: string[];
}

function SolutionCard({ href, icon, name, description, features }: SolutionCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all hover:border-[var(--color-brand-cyan)]/50 hover:bg-[var(--color-card-hover)]"
    >
      <div className="mb-4 text-[var(--color-brand-cyan)]">{icon}</div>
      <Title className="mb-2 group-hover:text-[var(--color-accent)] transition-colors">
        {name}
      </Title>
      <Body className="mb-4">{description}</Body>
      <ul className="flex flex-wrap gap-2">
        {features.map((feature) => (
          <li key={feature}>
            <Tag>{feature}</Tag>
          </li>
        ))}
      </ul>
    </Link>
  );
}

export default function SolutionsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="Solutions"
          description="산업 현장의 데이터를 클라우드로 연결하는 통합 솔루션"
        />

        {/* Products Section */}
        <section className="mb-20">
          <SectionLabel centered={false}>Products</SectionLabel>
          <CardGrid cols={1} mdCols={3}>
            {PRODUCTS.map((product) => (
              <SolutionCard key={product.href} {...product} />
            ))}
          </CardGrid>
        </section>

        {/* Platform Section */}
        <section className="mb-20">
          <SectionLabel centered={false}>Platform</SectionLabel>
          <CardGrid cols={1} mdCols={2}>
            {PLATFORM.map((item) => (
              <SolutionCard key={item.href} {...item} />
            ))}
          </CardGrid>
        </section>

        {/* Services Section */}
        <section>
          <SectionLabel centered={false}>Services</SectionLabel>
          <CardGrid cols={1} mdCols={2}>
            {SERVICES.map((service) => (
              <SolutionCard key={service.href} {...service} />
            ))}
          </CardGrid>
        </section>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Body className="mb-6">어떤 솔루션이 적합한지 모르시겠나요?</Body>
          <Button href="/contact">상담 요청하기</Button>
        </div>
      </div>
    </div>
  );
}
