# Nodi Cloud 프로젝트

산업용 엣지 게이트웨이 관리를 위한 클라우드 플랫폼.

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js v5
- **Styling**: Tailwind CSS (다크 테마)


## 프로젝트 구조

```
src/
├── app/
│   ├── (public)/       # 공개 페이지 (랜딩, 솔루션, 회사소개)
│   ├── (dashboard)/    # 사용자 대시보드 (로그인 필요)
│   ├── (admin)/        # 관리자 페이지 (ADMIN 권한 필요)
│   └── api/            # API 라우트
├── components/         # 공통 컴포넌트
├── config/             # 중앙 설정 관리
│   ├── site.ts         # 회사/사이트 정보
│   ├── env.ts          # 환경변수 타입 안전 접근
│   └── index.ts        # 통합 export
└── lib/                # 유틸리티 (auth, db, etc.)
```


## 설정 관리

### 중앙 설정 (`src/config/`)

**회사/사이트 정보 변경 시 `site.ts` 수정:**
```typescript
import { siteConfig } from "@/config";

siteConfig.name              // "Nodi"
siteConfig.company.email     // "contact@nodi.co.kr"
siteConfig.company.phone     // "+82-2-1234-5678"
siteConfig.logo.symbol       // "/nodi-logo-symbol.png"
```

**환경변수 접근 (`env.ts`):**
```typescript
import { env } from "@/config";

env.port          // PORT (기본 20300)
env.host          // HOST
env.baseUrl       // http://HOST:PORT
env.databaseUrl   // DATABASE_URL
```

### 환경변수 (`.env`)

```bash
# Server
PORT=20300
HOST=192.168.45.123

# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://HOST:PORT"  # PORT/HOST와 일치해야 함
NEXTAUTH_SECRET="..."

# AWS SES (이메일)
AWS_REGION="ap-northeast-2"
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
SES_FROM_EMAIL="noreply@example.com"

# Kakao Map
NEXT_PUBLIC_KAKAO_MAP_API_KEY="..."
```


## 주요 페이지

| 경로 | 설명 |
|------|------|
| `/` | 랜딩 페이지 |
| `/solutions` | 솔루션 개요 (Products + Services) |
| `/platform` | 클라우드 플랫폼 기능 소개 |
| `/company` | 회사 소개 |
| `/login` | 로그인 |
| `/dashboard` | 사용자 대시보드 |
| `/admin/*` | 관리자 페이지 |


## 네비게이션 구조

```
Solutions ▾          Platform    References    Resources    Company
├─ Products
│   Edge Gateway
│   Sparkplug B
│   TagBus
├─ Services
│   계측기 설치
│   엣지 게이트웨이 구축
```

네비게이션은 `src/components/Navigation.tsx`에서 관리.
드롭다운 메뉴 항목은 `SOLUTIONS_MENU` 상수에 정의.


## 개발 명령어

```bash
npm run dev          # 개발 서버 (포트 20300)
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버
npx prisma studio    # DB 관리 UI
npx prisma migrate   # DB 마이그레이션
```


## 인증 시스템

- NextAuth.js v5 사용
- 이메일/비밀번호 + Google OAuth (선택)
- 역할: `USER`, `ADMIN`
- 초대 기반 회원가입 (`REGISTRATION_MODE=invite_only`)

**테스트 계정:**
- admin@test.com / admin123 (관리자)


## 스타일 가이드

- 다크 테마 기본 (CSS 변수 사용)
- 색상: `--color-brand-blue`, `--color-brand-cyan`, `--color-accent`
- 카드: `rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]`
- 버튼: `rounded-full` 스타일 사용


## 레이아웃 구조

- **(public)**: 글로벌 네비게이션 + 푸터 (`NavigationWrapper`)
- **(dashboard)**: 사이드바 레이아웃
- **(admin)**: 사이드바 + 관리자 서브메뉴


## 주의사항

1. **포트 변경 시**: `.env`의 `PORT`, `HOST`, `NEXTAUTH_URL` 모두 일치해야 함
2. **회사 정보 변경 시**: `src/config/site.ts` 한 곳만 수정
3. **새 페이지 추가 시**: 적절한 route group 선택 (`(public)`, `(dashboard)`, `(admin)`)
