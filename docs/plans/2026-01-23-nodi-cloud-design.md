# nodi-cloud Platform Design

## Overview

nodi-cloud is a comprehensive web platform for nodi's industrial edge gateway products.
It serves three primary functions: public marketing, customer dashboard, and integration archive.

## Naming Convention

| Context | Format | Example |
|---------|--------|---------|
| 회사명 | Title Case | **Nodi** |
| 제품명 | Title Case | **Nodi Cloud**, **Nodi Edge** |
| 코드/URL/파일명 | kebab-case | `nodi-cloud`, `nodi-edge`, `/nodi-edge` |

**규칙:**
- 메인 페이지 (Public): 로고 옆에 **Nodi** (회사명)
- 로그인 후 대시보드: 로고 옆에 **Nodi Cloud** (제품명)
- 코드, URL, 파일명은 소문자 kebab-case 유지
- 이메일, 문서 등에서는 "Nodi Cloud", "Nodi Edge" 형태로 표기

## Target Users

- **Public visitors**: Potential customers exploring nodi's edge gateway products
- **Customers**: Companies that have purchased nodi edge gateways, invited via email
- **Developers**: Customers integrating sensors/PLCs with their gateways

## Core Areas

### 1. Public Marketing Site

Publicly accessible pages introducing nodi and its products.

**Pages:**
- Landing page (hero + product overview + supported protocols)
- Company page (회사 소개 + 연락처 + Kakao Map)
- Products detail page
- Contact/inquiry form

**Key messaging:**
- Industrial edge gateway platform
- Supports 10+ protocols (MQTT, Sparkplug, OPC UA, Kafka, REST, Modbus TCP/RTU, SQL, TSDB, Fieldbus)
- Bidirectional communication (monitoring + control)
- Automatic recovery and high-speed data processing

### 2. Customer Dashboard (Authenticated)

Protected area for customers to monitor and manage their edge gateways.

**Authentication:**
- NextAuth.js v5 (Auth.js) with JWT sessions
- 로그인 방식: Google OAuth + 이메일/비밀번호
- Invitation-based signup (관리자가 초대 링크 생성, 고객이 직접 이메일 입력)
- 역할: ADMIN / USER
- Multi-tenancy: Customer 단위로 게이트웨이 접근 권한 관리
- 이메일 저장: SHA-256 해시 (검색용) + AES-256-GCM 암호화 (복호화용)

**Pages:**
- Gateway list: table view with serial number, status (online/offline), alias, last seen, firmware version
- Gateway detail: time-series charts for collected sensor/measurement data
- Gateway config: remote access to gateway configuration page
- Account settings

**Data Model (Prisma):**
- Customer: id, code (고유 내부 코드), name, description
- User: id, email (해시), emailEncrypted, password, role (ADMIN/USER), customerId
- Invitation: id, token, customerId, role, invitedBy, expiresAt, acceptedAt
- GatewayAccess: id, serial, customerId (Customer 단위 게이트웨이 매핑)
- Session, Account: NextAuth.js 관리

**Access Control:**
- Middleware: /nodi-edge/*, /admin/*, /settings/* 보호
- Admin 라우트: ADMIN role 필요
- Gateway 접근: Customer의 GatewayAccess 기준
- URL pattern: /nodi-edge/{serial}

### 3. Integration Archive

Knowledge base of sensor/PLC/instrument configurations.

**Features:**
- List of supported integrations (sensor models, PLC brands, etc.)
- Configuration archives (connection settings, tag mappings)
- Details are not fully public (summary visible, full config requires auth)
- "Import to my gateway" button for authenticated customers

## Architecture

### Route Structure

```
src/app/
├── (public)/              # Public marketing (no auth)
│   ├── page.tsx           # Landing page
│   ├── products/          # Product detail
│   └── contact/           # Contact form
├── (auth)/                # Authentication pages
│   ├── layout.tsx         # 중앙 정렬 카드 레이아웃
│   ├── login/             # 로그인 (이메일 + Google)
│   ├── signup/[token]/    # 초대 기반 가입
│   ├── forgot-password/   # 비밀번호 재설정 요청
│   └── reset-password/[token]/ # 비밀번호 재설정
├── (dashboard)/           # Authenticated area
│   ├── layout.tsx         # 사이드바 레이아웃
│   ├── dashboard/         # Dashboard (게이트웨이 목록 등)
│   ├── dashboard/[serial]/ # Individual gateway
│   │   ├── page.tsx       # Time-series charts
│   │   └── config/        # Remote configuration
│   └── settings/          # Account settings
├── (admin)/               # Admin area (ADMIN role only)
│   ├── layout.tsx         # 사이드바 + Admin 서브메뉴
│   └── customers/         # 고객 관리
│       ├── page.tsx       # 고객 목록
│       └── [id]/          # 고객 상세 + 초대 링크
├── (archive)/             # Integration archive
│   ├── integrations/      # Integration list
│   └── integrations/[id]/ # Detail + import
├── api/
│   ├── auth/[...nextauth]/ # NextAuth API
│   ├── auth/signup/       # 회원가입 API
│   ├── invitations/       # 초대 관리 API
│   ├── password-reset/    # 비밀번호 재설정 API
│   └── customers/         # 고객 관리 API
└── layout.tsx             # Root layout (dark theme)
```

### Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.4 (App Router) |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Auth | NextAuth.js v5 (Auth.js) + JWT Sessions |
| Auth Providers | Google OAuth, Credentials (email/password) |
| Database | PostgreSQL |
| ORM | Prisma 7.3.0 |
| Password Hashing | bcrypt (cost 12) |
| Email Service | AWS SES (planned) |
| Charts | Recharts or Chart.js (planned) |
| Deployment | systemd on port 20300 |

### Communication (Edge <-> Cloud)

Supported protocols for gateway-cloud communication:
- MQTT / Sparkplug B
- OPC UA
- Kafka
- REST API

Local device communication (handled by edge gateway):
- Modbus TCP / RTU
- SQL / TSDB
- Fieldbus
- All cloud protocols above

## Design System

### Color Palette (Dark Theme)

CSS 변수로 정의됨 (`globals.css`의 `@theme inline`):

| Purpose | CSS Variable | Value |
|---------|--------------|-------|
| Background (main) | `--color-background` | #0A0A0A |
| Background (card) | `--color-card` | #141414 |
| Background (hover) | `--color-card-hover` | #1E1E1E |
| Text (primary) | `--color-foreground` | #FAFAFA |
| Text (secondary) | `--color-muted` | #A0A0A0 |
| Accent (primary) | `--color-accent` | #00FFDD (Cyan) |
| Accent (hover) | `--color-accent-hover` | #40FFE6 |
| Accent (dim) | `--color-accent-dim` | #80FFEE |
| Brand Navy | `--color-brand-navy` | #0E185F |
| Brand Blue | `--color-brand-blue` | #2FA4FF |
| Brand Cyan | `--color-brand-cyan` | #00FFDD |
| Brand Lime | `--color-brand-lime` | #E8FFC2 |
| Border | `--color-border` | rgba(255,255,255,0.08) |
| Status: online | `--color-status-online` | #00FFDD |
| Status: offline | `--color-status-offline` | #EF4444 |

사용 예시: `bg-[var(--color-card)]`, `text-[var(--color-accent)]`

### Typography

- Primary font: Inter (`--font-sans`)
- Mono font: JetBrains Mono (`--font-mono`)
- Hero heading: 48-64px, font-semibold
- Section heading: 24-32px
- Body: 16px, line-height 1.6

### Design Principles

#### 일관성 (Consistency)
- **로고 위치 고정**: 모든 페이지에서 로고는 동일한 위치에 표시
  - 위치: `fixed top-0 left-0`, `h-16`, `px-6 md:px-12`
  - 페이지 전환 시 로고가 움직이지 않아야 함
- **로고 이미지**: 원본 그대로 사용 (라운드 처리 금지)
- **네비게이션 높이**: 모든 페이지에서 `h-16` (64px) 통일

#### 시각적 계층 (Visual Hierarchy)
- 메인 페이지: 로고 + "Nodi" (회사명)
- 로그인 후 대시보드: 로고 + "Nodi Cloud" (제품명)
- 로고 클릭 시 항상 메인 페이지(`/`)로 이동

### Components

#### Login Page
- 중앙 정렬된 카드 형태 컨테이너
- 카드: `rounded-2xl`, `border`, `shadow-xl shadow-black/20`
- 반응형 패딩: `px-4 py-8 sm:px-6 lg:px-8`
- 최대 너비: `max-w-sm sm:max-w-md`
- 로그인 버튼: `bg-[var(--color-accent)] text-black font-medium rounded-lg`
- Google 버튼: `border border-[var(--color-border)] rounded-lg`, 컬러 Google 로고
- 구분선: flex + border-t + "또는" 텍스트

#### Sidebar (Dashboard)
- 고정 위치: `fixed left-0 top-0 h-full w-64`
- 배경: `bg-[var(--color-card)]`
- 로고 영역: `h-16`, 하단 border
- 네비게이션: `py-6 px-3`, 아이템 간격 `space-y-1`
- 메뉴 아이템: `px-4 py-2.5 rounded-lg`, 호버 시 `bg-[var(--color-card-hover)]`
- 활성 메뉴: `text-[var(--color-accent)] bg-[var(--color-accent)]/10`
- 유저 프로필: 그라데이션 아바타 (`from-[var(--color-accent)] to-[var(--color-brand-blue)]`)
- 로그아웃: 호버 시 `text-red-400 bg-red-400/10`

#### Buttons
- Primary: `bg-[var(--color-accent)] text-black font-medium rounded-lg hover:opacity-90`
- Secondary: `bg-[var(--color-card-hover)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-muted)]/50`
- Rounded pill: `rounded-full px-4 py-1.5`

**Note**: Secondary 버튼은 Input 필드(`bg-[var(--color-card)]`)와 구분되도록 더 밝은 `bg-[var(--color-card-hover)]` 배경색을 사용합니다.

#### Cards
- `rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]`
- 호버: `hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-card-hover)]`

#### Forms
- Input: `bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg`
- Focus: `focus:outline-none focus:border-[var(--color-accent)]`
- 라벨: `text-sm font-medium mb-2`

### Shared UI Components

재사용 가능한 UI 컴포넌트들은 `src/components/ui/`에 정의되어 있습니다.

```
src/components/ui/
├── index.ts          # 모든 컴포넌트 export
├── Button.tsx        # Button, ButtonLink 컴포넌트
├── Input.tsx         # Input 컴포넌트
└── Card.tsx          # Card 컴포넌트
```

#### Button

```tsx
import { Button, ButtonLink } from "@/components/ui";

// 버튼 variants: primary, secondary, ghost, danger
// 버튼 sizes: sm, md, lg

<Button variant="primary" size="lg" fullWidth>로그인</Button>
<Button variant="secondary">취소</Button>
<ButtonLink href="/dashboard" variant="secondary">대시보드로 이동</ButtonLink>
```

#### Input

```tsx
import { Input } from "@/components/ui";

<Input label="이메일" type="email" placeholder="name@example.com" error="유효하지 않은 이메일" />
```

#### Card

```tsx
import { Card } from "@/components/ui";

// padding: none, sm, md, lg
// hover: true/false

<Card hover padding="lg">카드 내용</Card>
```

**Note**: 새로운 페이지나 컴포넌트를 만들 때는 인라인 스타일 대신 이 공용 컴포넌트들을 사용해야 합니다.

### Design Reference

- litmus.io (industrial IoT, dark theme, minimal)
- Sticky header with backdrop blur
- Full-viewport hero with centered text
- Clean grid layouts with consistent spacing
- Cyan accent color for industrial/tech feel

## Implementation Priority

All three areas developed in parallel with MVP features:

1. Public: Landing page with hero + protocol list
2. Dashboard: Gateway list table (mock data) + detail page skeleton
3. Archive: Integration list (mock data)

## MVP Scope (Phase 1)

- [x] Dark theme root layout with Inter + JetBrains Mono fonts
- [x] Public landing page (hero, features, protocols)
- [x] Dashboard layout (sidebar navigation)
- [x] Gateway list page (mock data, table with status)
- [ ] Gateway detail page (placeholder for charts)
- [x] Integration list page (mock data)
- [x] NextAuth.js 설정 (Google OAuth + Credentials)
- [x] Basic responsive design (mobile-friendly)

## Authentication (Phase 2) - 완료

- [x] Prisma 스키마 (Customer, User, Invitation, GatewayAccess)
- [x] 로그인 페이지 (이메일/비밀번호 + Google)
- [x] JWT 세션 전략
- [x] 초대 기반 회원가입 페이지
- [x] 비밀번호 재설정 플로우
- [x] Admin 고객 관리 페이지
- [x] Middleware 기반 라우트 보호
- [x] 이메일 해시/암호화 저장
