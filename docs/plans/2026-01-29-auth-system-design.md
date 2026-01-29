# nodi-cloud 인증 시스템 설계

## 개요

nodi-cloud 인증 시스템은 **초대 전용** 가입 방식으로, Google OAuth와 이메일/비밀번호 로그인을 지원합니다. 관리자가 고객사를 생성하고 초대 링크를 발급하면, 고객이 직접 가입합니다.

### 핵심 요구사항

- 초대 전용 가입 (향후 오픈 가입 전환 가능)
- Google OAuth + 이메일/비밀번호 로그인
- 고객사 단위 관리 (내부 코드, 이름, 설명)
- 게이트웨이 ↔ 고객사 맵핑
- 관리자(admin) / 사용자(user) 2단계 역할
- 이메일 암호화 저장


## 기술 스택

| 구성요소 | 기술 | 역할 |
|----------|------|------|
| 인증 프레임워크 | NextAuth.js v5 (Auth.js) | OAuth + Credentials 통합 |
| ORM | Prisma | DB 스키마 관리, 타입 안전한 쿼리 |
| 데이터베이스 | PostgreSQL | 사용자, 세션, 초대 데이터 저장 |
| 비밀번호 해싱 | bcrypt | 안전한 비밀번호 저장 |
| 이메일 발송 | AWS SES | 초대 메일, 비밀번호 재설정 |
| 세션 관리 | DB 세션 | PostgreSQL에 세션 저장 |


## 데이터 모델

### Prisma 스키마

```prisma
// 고객사 (관리 단위)
model Customer {
  id            String    @id @default(cuid())
  code          String    @unique  // 관리용 코드 (예: "ACME-001")
  name          String              // 고객사명 (예: "ACME 제조")
  description   String?             // 관리자 메모
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  users         User[]
  gateways      GatewayAccess[]
  invitations   Invitation[]
}

// 초대
model Invitation {
  id            String    @id @default(cuid())
  token         String    @unique  // 초대 링크용 토큰
  customerId    String
  customer      Customer  @relation(fields: [customerId], references: [id])
  role          Role      @default(USER)
  invitedBy     String              // admin user id
  expiresAt     DateTime
  acceptedAt    DateTime?
  createdAt     DateTime  @default(now())
}

// 사용자
model User {
  id              String    @id @default(cuid())
  email           String    @unique  // SHA-256 해시 (조회용)
  emailEncrypted  String             // AES-256-GCM 암호화 (복호화용)
  name            String?
  password        String?            // bcrypt 해시, null이면 OAuth 전용
  role            Role      @default(USER)
  customerId      String?
  customer        Customer? @relation(fields: [customerId], references: [id])
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  sessions        Session[]
  accounts        Account[]
}

// OAuth 계정 연결 (NextAuth.js 표준)
model Account {
  id                String  @id @default(cuid())
  userId            String
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?

  @@unique([provider, providerAccountId])
}

// DB 세션 (NextAuth.js 표준)
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expires      DateTime
}

// 비밀번호 재설정 토큰
model PasswordResetToken {
  id        String   @id @default(cuid())
  token     String   @unique
  email     String              // 해시
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime @default(now())
}

// 게이트웨이 접근 권한
model GatewayAccess {
  id            String    @id @default(cuid())
  serial        String              // 게이트웨이 시리얼
  customerId    String
  customer      Customer  @relation(fields: [customerId], references: [id])
  createdAt     DateTime  @default(now())

  @@unique([serial, customerId])
}

enum Role {
  USER
  ADMIN
}
```

### 이메일 암호화

| 필드 | 용도 | 방식 |
|------|------|------|
| `email` | 조회/중복 체크 | SHA-256 해시 |
| `emailEncrypted` | 표시/발송 | AES-256-GCM 암호화 |

- 환경변수 `EMAIL_ENCRYPTION_KEY`로 암호화 키 관리
- 조회는 해시로, 표시/발송은 복호화해서 사용


## 인증 플로우

### 1. 초대 플로우

```
관리자 → [고객 관리 페이지]
         ├─ 고객사 생성 (code: "ACME-001", name: "ACME 제조", 설명)
         ├─ 게이트웨이 할당 (시리얼 선택)
         └─ 초대 링크 생성 → 링크 복사
                ↓
관리자 → 고객에게 링크 전달 (이메일, 메신저 등 자유롭게)
                ↓
고객 → 링크 클릭 → 가입 페이지 (/signup/[token])
         ├─ Google 로그인 (이메일 자동 수집)
         └─ 또는 이메일 + 비밀번호 직접 입력
                ↓
        User 생성 → Customer에 연결 → Invitation 완료 처리 → 대시보드
```

### 2. 로그인 플로우

**이메일/비밀번호:**
```
이메일 + 비밀번호 입력
    → 이메일 해시로 User 조회
    → bcrypt 검증
    → DB 세션 생성
    → 대시보드 리다이렉트
```

**Google OAuth:**
```
Google 로그인
    → 이메일 해시로 User 조회
    → Account 연결 확인/생성
    → DB 세션 생성
    → 대시보드 리다이렉트
```

### 3. 비밀번호 재설정

```
이메일 입력 → 이메일 해시로 User 조회 → PasswordResetToken 생성
    → 복호화된 이메일로 AWS SES 발송
         ↓
토큰 링크 클릭 (/reset-password/[token])
    → 토큰 검증
    → 새 비밀번호 입력
    → bcrypt 해싱 후 저장
    → 토큰 사용 처리
```

### 4. 접근 제어

| 경로 | 조건 | 미충족 시 |
|------|------|-----------|
| `/nodi-edge/*` | 로그인 필수 | → `/login` 리다이렉트 |
| `/admin/*` | 로그인 + role=ADMIN | → `/nodi-edge` 리다이렉트 |
| `/login`, `/signup/*` | 비로그인 | → `/nodi-edge` 리다이렉트 (이미 로그인) |

### 5. 게이트웨이 접근 권한

- **일반 사용자**: 본인 고객사에 맵핑된 게이트웨이만 조회
- **관리자**: 모든 게이트웨이 조회 + 맵핑 관리


## 페이지 구조

### 라우트 구조

```
src/app/
├── (auth)/                              # 인증 관련 (로그아웃 상태)
│   ├── login/page.tsx                   # 로그인 (Google + 이메일)
│   ├── signup/[token]/page.tsx          # 초대 링크 가입
│   ├── forgot-password/page.tsx         # 비밀번호 재설정 요청
│   └── reset-password/[token]/page.tsx  # 새 비밀번호 입력
│
├── (dashboard)/                         # 고객 대시보드 (인증 필요)
│   ├── nodi-edge/                       # 게이트웨이 관리
│   │   ├── page.tsx                     # 목록
│   │   └── [serial]/
│   │       ├── page.tsx                 # 상세
│   │       └── config/page.tsx          # 원격 설정
│   └── settings/page.tsx                # 계정 설정, 비밀번호 변경
│
└── (admin)/                             # 관리자 전용
    ├── layout.tsx                       # 관리자 레이아웃 + 권한 체크
    ├── customers/
    │   ├── page.tsx                     # 고객 목록 (검색, 필터)
    │   └── [id]/page.tsx                # 고객 상세 (게이트웨이 할당, 초대 링크)
    ├── users/page.tsx                   # 전체 사용자 목록
    └── nodi-edge/page.tsx               # 전체 게이트웨이 관리
```

### API 라우트

```
src/app/api/
├── auth/
│   └── [...nextauth]/route.ts           # NextAuth.js 핸들러
├── invitations/
│   ├── route.ts                         # POST: 초대 생성
│   └── [token]/route.ts                 # GET: 초대 검증
├── customers/
│   └── route.ts                         # CRUD
├── password-reset/
│   ├── request/route.ts                 # POST: 재설정 요청
│   └── reset/route.ts                   # POST: 새 비밀번호 설정
└── admin/
    ├── users/route.ts                   # 사용자 관리
    └── gateways/route.ts                # 게이트웨이 맵핑 관리
```

### 미들웨어

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSession();

  // 인증 필요 경로
  if (pathname.startsWith('/nodi-edge') || pathname.startsWith('/admin')) {
    if (!session) {
      return redirect('/login');
    }
  }

  // 관리자 전용 경로
  if (pathname.startsWith('/admin')) {
    if (session.user.role !== 'ADMIN') {
      return redirect('/nodi-edge');
    }
  }

  // 이미 로그인한 사용자
  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    if (session) {
      return redirect('/nodi-edge');
    }
  }
}
```


## 환경 변수

```env
# 데이터베이스
DATABASE_URL="postgresql://user:password@localhost:5432/nodi_cloud"

# NextAuth.js
NEXTAUTH_URL="https://cloud.nodi.io"
NEXTAUTH_SECRET="..." # openssl rand -base64 32

# Google OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# 이메일 암호화
EMAIL_ENCRYPTION_KEY="..." # 32바이트 키

# AWS SES
AWS_REGION="ap-northeast-2"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
SES_FROM_EMAIL="noreply@nodi.io"

# 가입 모드 (향후 전환용)
REGISTRATION_MODE="invite_only" # invite_only | open
```


## 관리자 기능

### 고객 관리 페이지 (/admin/customers)

**목록 기능:**
- 고객 코드, 이름, 설명으로 검색
- 게이트웨이 수, 사용자 수 표시
- 생성일 기준 정렬

**상세 페이지 (/admin/customers/[id]):**
- 고객 정보 수정 (코드, 이름, 설명)
- 연결된 사용자 목록
- 게이트웨이 할당/해제
- 초대 링크 생성/관리 (활성 초대 목록, 만료일, 복사)

### 사용자 관리 페이지 (/admin/users)

- 전체 사용자 목록
- 이메일, 이름, 역할, 소속 고객사 표시
- 역할 변경 (user ↔ admin)
- 계정 비활성화


## 향후 확장

### 오픈 가입 전환

`REGISTRATION_MODE=open` 설정 시:
- 로그인 페이지에 "회원가입" 링크 표시
- 가입 시 이메일 인증 플로우 추가
- 가입 후 고객사 미연결 상태 (관리자가 수동 연결)

### 추가 고려 사항

- 다중 사용자 per 고객사 (현재 지원)
- 사용자별 세부 권한 (viewer/operator 등)
- 감사 로그 (로그인 기록, 설정 변경 등)
- 2FA (TOTP)
