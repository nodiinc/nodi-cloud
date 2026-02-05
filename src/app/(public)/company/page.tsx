import KakaoMap from "@/components/KakaoMap";
import { siteConfig } from "@/config";
import {
  Button,
  Section,
  SectionHeader,
  PageHero,
  FeatureCard,
  ContactCard,
  CardGrid,
  GradientText,
  IconBox,
  ArrowRightIcon,
  LocationIcon,
  EmailIcon,
  PhoneIcon,
  HexagonIcon,
  DiamondIcon,
  DiamondOutlineIcon,
} from "@/components/ui";

const CAPABILITIES = [
  {
    icon: <HexagonIcon />,
    title: "프로토콜 통합",
    description:
      "MQTT, OPC UA, Modbus 등 10개 이상의 산업 프로토콜을 하나의 게이트웨이에서 통합 관리합니다.",
  },
  {
    icon: <DiamondIcon />,
    title: "엣지 데이터 처리",
    description:
      "현장에서 데이터를 전처리하고 필터링하여 네트워크 부하를 줄이고 응답 속도를 높입니다.",
  },
  {
    icon: <DiamondOutlineIcon />,
    title: "원격 관리",
    description:
      "클라우드 대시보드에서 모든 게이트웨이를 실시간으로 모니터링하고 설정을 변경할 수 있습니다.",
  },
];

const COORDINATES = {
  latitude: 37.5065,
  longitude: 127.0536,
};

export default function CompanyPage() {
  const { company, name } = siteConfig;

  return (
    <>
      {/* Hero Section */}
      <PageHero
        label={`About ${name}`}
        title={
          <>
            공장 데이터 연결의
            <br />
            <GradientText>복잡함을 해결합니다</GradientText>
          </>
        }
        description={
          <>
            수십 가지 프로토콜, 수백 대의 장비, 끊임없는 데이터.
            <br className="hidden sm:block" />
            {name}는 이 모든 것을 하나로 연결하는 산업용 엣지 게이트웨이 플랫폼입니다.
          </>
        }
      />

      {/* What We Do Section */}
      <Section>
        <SectionHeader
          label="What We Do"
          title="산업 현장과 클라우드를 잇는 핵심 기술"
        />
        <CardGrid cols={1} mdCols={3}>
          {CAPABILITIES.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-card-hover)]"
            >
              <IconBox variant="gradient" className="mb-6">
                {item.icon}
              </IconBox>
              <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-3">
                {item.title}
              </h3>
              <p className="text-[var(--color-muted)] leading-relaxed">
                {item.description}
              </p>
              <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </CardGrid>
      </Section>

      {/* Vision Section */}
      <Section className="relative overflow-hidden">
        <div className="mx-auto max-w-4xl text-center relative">
          <p className="mb-4 text-base font-medium uppercase tracking-widest text-[var(--color-accent)]">
            Our Vision
          </p>
          <blockquote className="text-3xl md:text-4xl font-light leading-relaxed text-[var(--color-foreground)]">
            &ldquo;모든 산업 현장의 데이터가
            <br />
            <GradientText className="font-semibold">자유롭게 흐르는 세상</GradientText>
            을 만듭니다&rdquo;
          </blockquote>
          <p className="mt-8 text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
            {name}는 복잡한 산업 환경에서도 데이터가 끊김 없이 흐를 수 있도록,
            안정적이고 확장 가능한 연결 인프라를 제공합니다.
          </p>
        </div>
      </Section>

      {/* Contact Section */}
      <Section withBorder>
        <SectionHeader
          title="Contact Us"
          description="언제든지 문의해 주세요"
        />

        {/* Map */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-2 overflow-hidden mb-8">
          <KakaoMap
            latitude={COORDINATES.latitude}
            longitude={COORDINATES.longitude}
            className="h-[320px] md:h-[400px]"
          />
        </div>

        {/* Contact Cards */}
        <CardGrid cols={1} mdCols={3} gap="sm" className="mb-8">
          <ContactCard
            icon={<LocationIcon />}
            title="주소"
            value={company.address}
          />
          <ContactCard
            icon={<EmailIcon />}
            title="이메일"
            value={company.email}
            href={`mailto:${company.email}`}
          />
          <ContactCard
            icon={<PhoneIcon />}
            title="전화"
            value={company.phone}
            href={`tel:${company.phone}`}
          />
        </CardGrid>

        {/* CTA */}
        <div className="text-center">
          <Button href="/contact" icon={<ArrowRightIcon />}>
            문의하기
          </Button>
        </div>
      </Section>
    </>
  );
}
