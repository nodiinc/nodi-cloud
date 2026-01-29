# nodi-cloud Platform Design

## Overview

nodi-cloud is a comprehensive web platform for nodi's industrial edge gateway products.
It serves three primary functions: public marketing, customer dashboard, and integration archive.

## Target Users

- **Public visitors**: Potential customers exploring nodi's edge gateway products
- **Customers**: Companies that have purchased nodi edge gateways, invited via email
- **Developers**: Customers integrating sensors/PLCs with their gateways

## Core Areas

### 1. Public Marketing Site

Publicly accessible pages introducing nodi and its products.

**Pages:**
- Landing page (hero + product overview + supported protocols)
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
- Google OAuth via NextAuth.js
- Invitation-based signup (admin sends email to customer)
- Multi-tenancy: each customer sees only their own gateways

**Pages:**
- Gateway list: table view with serial number, status (online/offline), alias, last seen, firmware version
- Gateway detail: time-series charts for collected sensor/measurement data
- Gateway config: remote access to gateway configuration page
- Account settings

**Data Model:**
- Customer: id (UUID), name, email, oauth_sub, created_at
- Gateway: serial (PK, e.g. "NE-EBOW4"), customer_id (FK), alias, status, last_seen_at, firmware_ver
- TagData: gateway_serial, tag_id, value, quality, timestamp

**Access Control:**
- All queries filtered by customer_id
- Gateway access verified against ownership
- URL pattern: /gateways/{serial}

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
├── (dashboard)/           # Authenticated area
│   ├── layout.tsx         # Sidebar + header
│   ├── gateways/          # Gateway list (table)
│   ├── gateways/[serial]/ # Individual gateway
│   │   ├── page.tsx       # Time-series charts
│   │   └── config/        # Remote configuration
│   └── settings/          # Account settings
├── (archive)/             # Integration archive
│   ├── integrations/      # Integration list
│   └── integrations/[id]/ # Detail + import
├── api/
│   ├── auth/              # NextAuth Google OAuth
│   └── gateways/          # Gateway data API
└── layout.tsx             # Root layout (dark theme)
```

### Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui (planned) |
| Auth | NextAuth.js + Google OAuth |
| Database | PostgreSQL (planned) |
| ORM | Prisma (planned) |
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

| Purpose | Color | Value |
|---------|-------|-------|
| Background (main) | Near black | #0A0A0A |
| Background (card) | Dark gray | #141414 |
| Background (hover) | Medium gray | #1E1E1E |
| Text (primary) | White | #FAFAFA |
| Text (secondary) | Light gray | #A0A0A0 |
| Accent (primary) | Green | #00D47E |
| Status: online | Green | #22C55E |
| Status: offline | Red | #EF4444 |
| Border | Semi-transparent | rgba(255,255,255,0.08) |

### Typography

- Primary font: Inter (body text)
- Mono font: JetBrains Mono (serial numbers, code)
- Hero heading: 48-64px, font-semibold
- Section heading: 24-32px
- Body: 16px, line-height 1.6

### Components

- Buttons: rounded-full, 1px border, green background on hover
- Cards: rounded-xl, border white/8, background #141414
- Tables: no stripes, row highlight on hover
- Status badges: colored dot + text ("Online" / "Offline")

### Design Reference

- litmus.io (industrial IoT, dark theme, green accent, minimal)
- Sticky header with backdrop blur
- Full-viewport hero with centered text
- Clean grid layouts with consistent spacing

## Implementation Priority

All three areas developed in parallel with MVP features:

1. Public: Landing page with hero + protocol list
2. Dashboard: Gateway list table (mock data) + detail page skeleton
3. Archive: Integration list (mock data)

## MVP Scope (Phase 1)

- [ ] Dark theme root layout with Inter + JetBrains Mono fonts
- [ ] Public landing page (hero, features, protocols)
- [ ] Dashboard layout (sidebar navigation)
- [ ] Gateway list page (mock data, table with status)
- [ ] Gateway detail page (placeholder for charts)
- [ ] Integration list page (mock data)
- [ ] Google OAuth setup (NextAuth)
- [ ] Basic responsive design (mobile-friendly)
