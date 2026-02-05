"use client";

import { useState } from "react";
import {
  Button,
  Card,
  FeatureCard,
  StatCard,
  CTACard,
  ContactCard,
  ProcessStepCard,
  Badge,
  SectionLabel,
  Tag,
  HeroBadge,
  IconBox,
  CircleIcon,
  Section,
  SectionHeader,
  PageHero,
  PageHeader,
  GradientText,
  MutedText,
  CardTitle,
  CardDescription,
  CardGrid,
  FlexContainer,
  BulletList,
  CheckList,
  DotList,
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronDownIcon,
  CheckIcon,
  CheckCircleIcon,
  LocationIcon,
  EmailIcon,
  PhoneIcon,
  ClockIcon,
  DocumentIcon,
  SupportIcon,
  ImagePlaceholderIcon,
  HexagonIcon,
  DiamondIcon,
  DiamondOutlineIcon,
} from "@/components/ui";


// Component Preview Wrapper
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface ComponentPreviewProps {
  name: string;
  description?: string;
  children: React.ReactNode;
  code?: string;
}

function ComponentPreview({ name, description, children, code }: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="mb-12 border border-[var(--color-border)] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-card)]">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-foreground)] font-mono">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-[var(--color-muted)] mt-1">{description}</p>
          )}
        </div>
        {code && (
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-xs px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:border-[var(--color-accent)] transition-colors"
          >
            {showCode ? "Hide Code" : "Show Code"}
          </button>
        )}
      </div>

      {/* Preview */}
      <div className="p-6 bg-[var(--color-background)]">
        {children}
      </div>

      {/* Code */}
      {showCode && code && (
        <div className="border-t border-[var(--color-border)] bg-[#1a1a1a] p-4 overflow-x-auto">
          <pre className="text-xs text-[var(--color-muted)] font-mono whitespace-pre-wrap">
            {code}
          </pre>
        </div>
      )}
    </div>
  );
}


// Section Divider
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="mt-16 mb-8 flex items-center gap-4">
      <h2 className="text-2xl font-bold text-[var(--color-foreground)]">{title}</h2>
      <div className="flex-1 h-px bg-[var(--color-border)]" />
    </div>
  );
}


// Page Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function ComponentsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-12">
          <Badge variant="accent" className="mb-4">Design System</Badge>
          <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-4">
            Component Library
          </h1>
          <p className="text-lg text-[var(--color-muted)] max-w-2xl">
            Nodi Cloud에서 사용하는 공통 UI 컴포넌트 목록입니다.
            모든 컴포넌트는 <code className="text-[var(--color-accent)]">@/components/ui</code>에서 import할 수 있습니다.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="mb-12 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]">
          <h2 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-4">
            Components
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {[
              "Button", "Card", "FeatureCard", "StatCard", "CTACard", "ContactCard", "ProcessStepCard",
              "Badge", "SectionLabel", "Tag", "HeroBadge",
              "IconBox", "CircleIcon",
              "Section", "SectionHeader", "PageHero", "PageHeader",
              "GradientText", "MutedText", "CardTitle", "CardDescription",
              "CardGrid", "FlexContainer",
              "BulletList", "CheckList", "DotList",
              "Icons (15+)"
            ].map((name) => (
              <a
                key={name}
                href={`#${name.toLowerCase().replace(/[^a-z]/g, "")}`}
                className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors font-mono"
              >
                {name}
              </a>
            ))}
          </div>
        </div>


        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SectionDivider title="Buttons" />

        <ComponentPreview
          name="Button"
          description="Primary, Secondary, Ghost 버튼. href 속성으로 링크, 없으면 버튼으로 동작"
          code={`<Button href="/contact">Primary Button</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button icon={<ArrowRightIcon />}>With Icon</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button disabled>Disabled</Button>`}
        >
          <div className="flex flex-wrap gap-4 items-center">
            <Button href="#">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button icon={<ArrowRightIcon />}>With Icon</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center mt-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </ComponentPreview>


        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SectionDivider title="Cards" />

        <ComponentPreview
          name="Card"
          description="기본 카드 컨테이너. variant와 size 조합 가능"
          code={`<Card>Default Card</Card>
<Card variant="hover">Hover Effect</Card>
<Card variant="interactive" href="/link">Clickable</Card>
<Card size="sm">Small</Card>
<Card size="lg">Large</Card>`}
        >
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>variant="default"</CardDescription>
            </Card>
            <Card variant="hover">
              <CardTitle>Hover Card</CardTitle>
              <CardDescription>variant="hover"</CardDescription>
            </Card>
            <Card variant="interactive">
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>variant="interactive"</CardDescription>
            </Card>
          </div>
        </ComponentPreview>

        <ComponentPreview
          name="FeatureCard"
          description="아이콘 + 제목 + 설명 구조의 기능 카드"
          code={`<FeatureCard
  icon={<IconBox><CheckCircleIcon /></IconBox>}
  title="Feature Title"
  description="Feature description here"
/>`}
        >
          <div className="grid md:grid-cols-3 gap-4">
            <FeatureCard
              icon={<IconBox><CheckCircleIcon /></IconBox>}
              title="Real-time Monitoring"
              description="Monitor all connected devices with sub-second latency."
            />
            <FeatureCard
              icon={<IconBox><ClockIcon /></IconBox>}
              title="Auto Recovery"
              description="Automatic reconnection and fault recovery."
            />
            <FeatureCard
              icon={<IconBox><DocumentIcon /></IconBox>}
              title="Documentation"
              description="Comprehensive API documentation included."
            />
          </div>
        </ComponentPreview>

        <ComponentPreview
          name="StatCard"
          description="숫자/통계 강조 카드"
          code={`<StatCard value="99.9%" label="Uptime" />
<StatCard value="50+" label="Projects" icon={<CheckCircleIcon />} />`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value="99.9%" label="가동률" />
            <StatCard value="50+" label="프로젝트" />
            <StatCard value="1000+" label="연결 장비" />
            <StatCard value="30+" label="고객사" icon={<CheckCircleIcon />} />
          </div>
        </ComponentPreview>

        <ComponentPreview
          name="CTACard"
          description="CTA(Call to Action) 섹션용 카드"
          code={`<CTACard
  title="Ready to start?"
  description="Contact us for more information"
>
  <Button>Get Started</Button>
</CTACard>`}
        >
          <CTACard
            title="지금 바로 시작하세요"
            description="무료 체험으로 모든 기능을 경험해보세요"
          >
            <Button>무료로 시작하기</Button>
          </CTACard>
        </ComponentPreview>

        <ComponentPreview
          name="ContactCard"
          description="연락처 정보 카드"
          code={`<ContactCard
  icon={<EmailIcon />}
  title="이메일"
  value="contact@nodi.co.kr"
  href="mailto:contact@nodi.co.kr"
/>`}
        >
          <div className="grid md:grid-cols-3 gap-4">
            <ContactCard icon={<LocationIcon />} title="주소" value="서울시 강남구 테헤란로 123" />
            <ContactCard icon={<EmailIcon />} title="이메일" value="contact@nodi.co.kr" href="mailto:contact@nodi.co.kr" />
            <ContactCard icon={<PhoneIcon />} title="전화" value="02-1234-5678" href="tel:02-1234-5678" />
          </div>
        </ComponentPreview>

        <ComponentPreview
          name="ProcessStepCard"
          description="프로세스/단계 설명 카드"
          code={`<ProcessStepCard
  step="01"
  title="현장 조사"
  description="설치 환경 분석"
  details={["항목1", "항목2"]}
/>`}
        >
          <div className="space-y-4">
            <ProcessStepCard
              step="01"
              title="현장 조사"
              description="설치 환경 분석 및 측정 포인트 선정"
              details={["기존 설비 파악", "전원 공급 확인", "측정 범위 정의"]}
            />
          </div>
        </ComponentPreview>


        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SectionDivider title="Badges & Tags" />

        <ComponentPreview
          name="Badge"
          description="라벨/뱃지. variant: default, accent, muted, outline"
          code={`<Badge>Default</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="muted">Muted</Badge>
<Badge variant="outline">Outline</Badge>
<Badge size="xs">XS</Badge>
<Badge size="md">MD</Badge>`}
        >
          <div className="flex flex-wrap gap-3 items-center">
            <Badge>Default</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="muted">Muted</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <div className="flex flex-wrap gap-3 items-center mt-4">
            <Badge size="xs">Extra Small</Badge>
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
          </div>
        </ComponentPreview>

        <ComponentPreview
          name="SectionLabel"
          description="섹션 상단 라벨 (uppercase)"
          code={`<SectionLabel>Products</SectionLabel>
<SectionLabel centered={false}>Left Aligned</SectionLabel>`}
        >
          <SectionLabel>Products</SectionLabel>
          <SectionLabel centered={false}>Left Aligned Label</SectionLabel>
        </ComponentPreview>

        <ComponentPreview
          name="Tag"
          description="기능/기술 태그"
          code={`<Tag>MQTT</Tag>
<Tag>OPC UA</Tag>`}
        >
          <div className="flex flex-wrap gap-2">
            <Tag>MQTT</Tag>
            <Tag>OPC UA</Tag>
            <Tag>Modbus TCP</Tag>
            <Tag>REST API</Tag>
            <Tag>InfluxDB</Tag>
          </div>
        </ComponentPreview>

        <ComponentPreview
          name="HeroBadge"
          description="히어로 섹션용 큰 뱃지"
          code={`<HeroBadge>Nodi Cloud Platform</HeroBadge>`}
        >
          <HeroBadge>Nodi Cloud Platform</HeroBadge>
        </ComponentPreview>


        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SectionDivider title="Icon Containers" />

        <ComponentPreview
          name="IconBox"
          description="아이콘을 감싸는 컨테이너. size: xs ~ xl, variant: default, gradient, solid"
          code={`<IconBox><CheckIcon /></IconBox>
<IconBox size="lg" variant="gradient"><CheckIcon /></IconBox>
<IconBox size="xl" variant="solid">1</IconBox>`}
        >
          <div className="flex flex-wrap gap-4 items-end">
            <div className="text-center">
              <IconBox size="xs"><CheckIcon className="w-3 h-3" /></IconBox>
              <p className="text-xs text-[var(--color-muted)] mt-2">xs</p>
            </div>
            <div className="text-center">
              <IconBox size="sm"><CheckIcon className="w-4 h-4" /></IconBox>
              <p className="text-xs text-[var(--color-muted)] mt-2">sm</p>
            </div>
            <div className="text-center">
              <IconBox size="md"><CheckIcon /></IconBox>
              <p className="text-xs text-[var(--color-muted)] mt-2">md</p>
            </div>
            <div className="text-center">
              <IconBox size="lg"><CheckIcon className="w-7 h-7" /></IconBox>
              <p className="text-xs text-[var(--color-muted)] mt-2">lg</p>
            </div>
            <div className="text-center">
              <IconBox size="xl"><CheckIcon className="w-8 h-8" /></IconBox>
              <p className="text-xs text-[var(--color-muted)] mt-2">xl</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 items-center mt-6">
            <IconBox variant="default"><CheckCircleIcon /></IconBox>
            <IconBox variant="gradient"><CheckCircleIcon /></IconBox>
            <IconBox variant="solid"><CheckCircleIcon className="w-6 h-6" /></IconBox>
            <span className="text-sm text-[var(--color-muted)]">← default / gradient / solid</span>
          </div>
        </ComponentPreview>

        <ComponentPreview
          name="CircleIcon"
          description="원형 아이콘 컨테이너 (숫자 스텝 등)"
          code={`<CircleIcon>1</CircleIcon>
<CircleIcon variant="solid">2</CircleIcon>`}
        >
          <div className="flex flex-wrap gap-4 items-center">
            <CircleIcon>1</CircleIcon>
            <CircleIcon variant="gradient">2</CircleIcon>
            <CircleIcon variant="solid">3</CircleIcon>
          </div>
        </ComponentPreview>


        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SectionDivider title="Layout Components" />

        <ComponentPreview
          name="Section"
          description="페이지 섹션 컨테이너 (py-24 px-6 + max-w-7xl)"
          code={`<Section>Content here</Section>
<Section withBorder>With top border</Section>`}
        >
          <div className="border border-dashed border-[var(--color-border)] rounded-lg p-4 text-center text-[var(--color-muted)]">
            Section 컴포넌트는 전체 페이지 레이아웃에서 사용됩니다.
            <br />
            <code className="text-xs">withBorder</code> prop으로 상단 border 추가 가능
          </div>
        </ComponentPreview>

        <ComponentPreview
          name="SectionHeader"
          description="섹션 제목 + 설명 블록"
          code={`<SectionHeader
  label="Features"
  title="주요 기능"
  description="설명 텍스트"
/>`}
        >
          <SectionHeader
            label="Features"
            title="주요 기능"
            description="현장 장비부터 클라우드까지, 데이터 수집에 필요한 모든 것을 제공합니다."
          />
        </ComponentPreview>

        <ComponentPreview
          name="PageHeader"
          description="페이지 상단 헤더 (badge + title + description)"
          code={`<PageHeader
  badge="Service"
  title="센서 설치"
  description="설명"
/>`}
        >
          <PageHeader
            badge="Service"
            title="센서 · 계측기 설치"
            description="산업 현장의 다양한 측정 요구사항에 맞는 센서 및 계측기를 설치합니다."
          />
        </ComponentPreview>

        <ComponentPreview
          name="CardGrid"
          description="반응형 그리드 레이아웃"
          code={`<CardGrid cols={1} mdCols={2} lgCols={3} gap="md">
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</CardGrid>`}
        >
          <CardGrid cols={2} mdCols={4} gap="sm">
            {[1, 2, 3, 4].map((n) => (
              <Card key={n} className="text-center">
                <span className="text-lg font-bold text-[var(--color-foreground)]">{n}</span>
              </Card>
            ))}
          </CardGrid>
        </ComponentPreview>

        <ComponentPreview
          name="FlexContainer"
          description="Flex 레이아웃 컨테이너"
          code={`<FlexContainer gap="md" justify="between" align="center">
  <div>Left</div>
  <div>Right</div>
</FlexContainer>`}
        >
          <FlexContainer gap="md" justify="between" align="center" className="p-4 border border-dashed border-[var(--color-border)] rounded-lg">
            <Badge>Left</Badge>
            <Badge>Center</Badge>
            <Badge>Right</Badge>
          </FlexContainer>
        </ComponentPreview>


        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SectionDivider title="Typography" />

        <ComponentPreview
          name="GradientText"
          description="그라데이션 텍스트"
          code={`<GradientText>Gradient Text</GradientText>
<h1><GradientText as="span">In Heading</GradientText></h1>`}
        >
          <div className="space-y-4">
            <p className="text-2xl font-bold">
              일반 텍스트와 <GradientText>그라데이션 텍스트</GradientText>
            </p>
            <h2 className="text-4xl font-bold">
              <GradientText>데이터 수집이 첫걸음입니다</GradientText>
            </h2>
          </div>
        </ComponentPreview>

        <ComponentPreview
          name="CardTitle & CardDescription"
          description="카드 내부 제목/설명 텍스트"
          code={`<CardTitle>Card Title</CardTitle>
<CardDescription>Card description text</CardDescription>`}
        >
          <Card>
            <CardTitle>카드 제목 (CardTitle)</CardTitle>
            <CardDescription>카드 설명 텍스트입니다. 작은 사이즈의 muted 색상 텍스트로 표시됩니다.</CardDescription>
          </Card>
        </ComponentPreview>

        <ComponentPreview
          name="MutedText"
          description="회색 텍스트"
          code={`<MutedText>Muted text content</MutedText>`}
        >
          <MutedText>이것은 MutedText 컴포넌트입니다. 부가 설명이나 덜 중요한 정보에 사용합니다.</MutedText>
        </ComponentPreview>


        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SectionDivider title="Lists" />

        <ComponentPreview
          name="BulletList"
          description="불릿 리스트"
          code={`<BulletList items={["Item 1", "Item 2", "Item 3"]} />`}
        >
          <BulletList items={[
            "전력미터 설치 및 Modbus TCP 기반 전력 데이터 수집",
            "OPC DA/OPC UA를 통한 기존 PI 시스템 데이터 연동",
            "InfluxDB 기반 EIS 서버 데이터 저장 및 분석",
          ]} />
        </ComponentPreview>

        <ComponentPreview
          name="CheckList"
          description="체크 리스트 (1열 또는 2열)"
          code={`<CheckList items={["Item 1", "Item 2"]} columns={2} />`}
        >
          <CheckList
            items={["기존 설비 파악", "전원 공급 확인", "측정 범위 정의", "설치 위치 검토"]}
            columns={2}
          />
        </ComponentPreview>

        <ComponentPreview
          name="DotList"
          description="점 리스트 (제목 + 설명)"
          code={`<DotList items={[
  { name: "Item", desc: "Description" }
]} />`}
        >
          <DotList items={[
            { name: "전력량계 (kWh Meter)", desc: "유효/무효 전력량, 역률, 고조파 측정" },
            { name: "전류 변성기 (CT)", desc: "대전류 측정을 위한 변환 장치" },
            { name: "멀티미터", desc: "전압, 전류, 전력, 역률 통합 측정" },
          ]} />
        </ComponentPreview>


        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <SectionDivider title="Icons" />

        <ComponentPreview
          name="Icons"
          description="공통 아이콘 컴포넌트들"
          code={`import { ArrowRightIcon, CheckIcon, ... } from "@/components/ui";

<ArrowRightIcon className="w-4 h-4" />
<CheckIcon strokeWidth={2} />`}
        >
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {[
              { Icon: ArrowRightIcon, name: "ArrowRight" },
              { Icon: ArrowLeftIcon, name: "ArrowLeft" },
              { Icon: ChevronDownIcon, name: "ChevronDown" },
              { Icon: CheckIcon, name: "Check" },
              { Icon: CheckCircleIcon, name: "CheckCircle" },
              { Icon: LocationIcon, name: "Location" },
              { Icon: EmailIcon, name: "Email" },
              { Icon: PhoneIcon, name: "Phone" },
              { Icon: ClockIcon, name: "Clock" },
              { Icon: DocumentIcon, name: "Document" },
              { Icon: SupportIcon, name: "Support" },
              { Icon: ImagePlaceholderIcon, name: "ImagePlaceholder" },
            ].map(({ Icon, name }) => (
              <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-[var(--color-card)] transition-colors">
                <Icon className="w-6 h-6 text-[var(--color-foreground)]" />
                <span className="text-[10px] text-[var(--color-muted)] text-center">{name}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-muted)] mb-3">Shape Icons (decorative):</p>
            <div className="flex gap-6 items-center">
              <div className="flex flex-col items-center gap-2">
                <HexagonIcon />
                <span className="text-[10px] text-[var(--color-muted)]">Hexagon</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <DiamondIcon />
                <span className="text-[10px] text-[var(--color-muted)]">Diamond</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <DiamondOutlineIcon />
                <span className="text-[10px] text-[var(--color-muted)]">DiamondOutline</span>
              </div>
            </div>
          </div>
        </ComponentPreview>


        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border)] text-center">
          <MutedText>
            모든 컴포넌트는 <code className="text-[var(--color-accent)]">src/components/ui/</code> 디렉토리에 있습니다.
          </MutedText>
        </div>
      </div>
    </div>
  );
}
