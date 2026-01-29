# 인증 시스템 구현 계획

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** nodi-cloud에 초대 기반 인증 시스템 구현 (Google OAuth + 이메일/비밀번호)

**Architecture:** NextAuth.js v5 + Prisma + PostgreSQL 기반. 고객사(Customer) 단위로 사용자 관리, 게이트웨이 맵핑. 이메일 암호화 저장 (해시 + AES-256).

**Tech Stack:** NextAuth.js v5, Prisma, PostgreSQL, bcrypt, AWS SES, crypto (Node.js)

**Design Document:** `docs/plans/2026-01-29-auth-system-design.md`

---

## Phase 1: 기반 설정

### Task 1: 의존성 설치

**Files:**
- Modify: `package.json`

**Step 1: 인증 관련 패키지 설치**

```bash
cd /root/nodi-cloud/.worktrees/auth
npm install next-auth@beta @prisma/client @auth/prisma-adapter bcrypt
npm install -D prisma @types/bcrypt
```

**Step 2: AWS SES 패키지 설치**

```bash
npm install @aws-sdk/client-ses
```

**Step 3: 설치 확인**

Run: `npm ls next-auth prisma bcrypt @aws-sdk/client-ses`
Expected: 패키지 버전 출력

**Step 4: 커밋**

```bash
git add package.json package-lock.json
git commit -m "feat: add auth dependencies (next-auth, prisma, bcrypt, aws-ses)"
```

---

### Task 2: Prisma 초기 설정

**Files:**
- Create: `prisma/schema.prisma`
- Create: `.env.example`

**Step 1: Prisma 초기화**

```bash
npx prisma init
```

**Step 2: 스키마 작성**

`prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
}

model Customer {
  id          String   @id @default(cuid())
  code        String   @unique
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  users       User[]
  gateways    GatewayAccess[]
  invitations Invitation[]
}

model User {
  id             String    @id @default(cuid())
  email          String    @unique
  emailEncrypted String
  name           String?
  password       String?
  role           Role      @default(USER)
  customerId     String?
  customer       Customer? @relation(fields: [customerId], references: [id])
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  sessions Session[]
  accounts Account[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expires      DateTime
}

model Invitation {
  id         String    @id @default(cuid())
  token      String    @unique
  customerId String
  customer   Customer  @relation(fields: [customerId], references: [id])
  role       Role      @default(USER)
  invitedBy  String
  expiresAt  DateTime
  acceptedAt DateTime?
  createdAt  DateTime  @default(now())
}

model PasswordResetToken {
  id        String    @id @default(cuid())
  token     String    @unique
  email     String
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime  @default(now())
}

model GatewayAccess {
  id         String   @id @default(cuid())
  serial     String
  customerId String
  customer   Customer @relation(fields: [customerId], references: [id])
  createdAt  DateTime @default(now())

  @@unique([serial, customerId])
}
```

**Step 3: .env.example 작성**

`.env.example`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nodi_cloud"

# NextAuth.js
NEXTAUTH_URL="http://localhost:20300"
NEXTAUTH_SECRET=""

# Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Email Encryption
EMAIL_ENCRYPTION_KEY=""

# AWS SES
AWS_REGION="ap-northeast-2"
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
SES_FROM_EMAIL="noreply@example.com"

# Registration Mode
REGISTRATION_MODE="invite_only"
```

**Step 4: .gitignore에 .env 추가 확인**

```bash
grep -q "^\.env" .gitignore && echo "OK" || echo ".env*" >> .gitignore
```

**Step 5: 커밋**

```bash
git add prisma/schema.prisma .env.example .gitignore
git commit -m "feat: add Prisma schema with auth models"
```

---

### Task 3: Prisma 클라이언트 설정

**Files:**
- Create: `src/lib/prisma.ts`

**Step 1: lib 디렉토리 생성**

```bash
mkdir -p src/lib
```

**Step 2: Prisma 싱글톤 클라이언트 작성**

`src/lib/prisma.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

**Step 3: 커밋**

```bash
git add src/lib/prisma.ts
git commit -m "feat: add Prisma client singleton"
```

---

### Task 4: 이메일 암호화 유틸리티

**Files:**
- Create: `src/lib/crypto.ts`

**Step 1: 암호화 유틸리티 작성**

`src/lib/crypto.ts`:

```typescript
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const TAG_LENGTH = 16;

function getEncryptionKey(): Buffer {
  const key = process.env.EMAIL_ENCRYPTION_KEY;
  if (!key) {
    throw new Error("EMAIL_ENCRYPTION_KEY is not set");
  }
  return Buffer.from(key, "base64");
}

export function hashEmail(email: string): string {
  return createHash("sha256").update(email.toLowerCase().trim()).digest("hex");
}

export function encryptEmail(email: string): string {
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  const normalizedEmail = email.toLowerCase().trim();
  let encrypted = cipher.update(normalizedEmail, "utf8", "base64");
  encrypted += cipher.final("base64");

  const tag = cipher.getAuthTag();

  // Format: iv:tag:encrypted
  return `${iv.toString("base64")}:${tag.toString("base64")}:${encrypted}`;
}

export function decryptEmail(encryptedData: string): string {
  const key = getEncryptionKey();
  const [ivB64, tagB64, encrypted] = encryptedData.split(":");

  const iv = Buffer.from(ivB64, "base64");
  const tag = Buffer.from(tagB64, "base64");

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

export function generateToken(): string {
  return randomBytes(32).toString("hex");
}
```

**Step 2: 커밋**

```bash
git add src/lib/crypto.ts
git commit -m "feat: add email encryption utilities"
```

---

## Phase 2: NextAuth.js 설정

### Task 5: NextAuth.js 기본 설정

**Files:**
- Create: `src/lib/auth.ts`
- Create: `src/app/api/auth/[...nextauth]/route.ts`

**Step 1: auth 설정 파일 작성**

`src/lib/auth.ts`:

```typescript
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import { prisma } from "./prisma";
import { hashEmail, decryptEmail } from "./crypto";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const emailHash = hashEmail(credentials.email as string);
        const user = await prisma.user.findUnique({
          where: { email: emailHash },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await compare(credentials.password as string, user.password);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: decryptEmail(user.emailEncrypted),
          name: user.name,
          role: user.role,
          customerId: user.customerId,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // OAuth 로그인 시 기존 사용자 확인
      if (account?.provider === "google" && user.email) {
        const emailHash = hashEmail(user.email);
        const existingUser = await prisma.user.findUnique({
          where: { email: emailHash },
        });

        // 기존 사용자가 없으면 로그인 거부 (초대 전용)
        if (!existingUser && process.env.REGISTRATION_MODE === "invite_only") {
          return false;
        }
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true, customerId: true, emailEncrypted: true },
        });
        if (dbUser) {
          session.user.id = user.id;
          session.user.role = dbUser.role;
          session.user.customerId = dbUser.customerId;
          session.user.email = decryptEmail(dbUser.emailEncrypted);
        }
      }
      return session;
    },
  },
});
```

**Step 2: API 라우트 핸들러 작성**

`src/app/api/auth/[...nextauth]/route.ts`:

```typescript
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
```

**Step 3: 타입 확장 파일 작성**

`src/types/next-auth.d.ts`:

```typescript
import { Role } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface User {
    role?: Role;
    customerId?: string | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: Role;
      customerId?: string | null;
    };
  }
}
```

**Step 4: 커밋**

```bash
git add src/lib/auth.ts src/app/api/auth/[...nextauth]/route.ts src/types/next-auth.d.ts
git commit -m "feat: add NextAuth.js configuration with Google and credentials providers"
```

---

### Task 6: 미들웨어 설정

**Files:**
- Create: `src/middleware.ts`

**Step 1: 미들웨어 작성**

`src/middleware.ts`:

```typescript
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "ADMIN";

  // 보호된 경로
  const protectedRoutes = ["/nodi-edge", "/settings"];
  const adminRoutes = ["/admin"];
  const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

  // 인증 필요 경로
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 관리자 전용 경로
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/nodi-edge", req.url));
    }
  }

  // 이미 로그인한 사용자가 인증 페이지 접근
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/nodi-edge", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/nodi-edge/:path*",
    "/admin/:path*",
    "/settings/:path*",
    "/login",
    "/signup/:path*",
    "/forgot-password",
    "/reset-password/:path*",
  ],
};
```

**Step 2: 커밋**

```bash
git add src/middleware.ts
git commit -m "feat: add auth middleware for route protection"
```

---

## Phase 3: 인증 UI 페이지

### Task 7: 로그인 페이지

**Files:**
- Create: `src/app/(auth)/layout.tsx`
- Create: `src/app/(auth)/login/page.tsx`

**Step 1: auth 레이아웃 작성**

`src/app/(auth)/layout.tsx`:

```typescript
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="w-full max-w-md p-8">
        {children}
      </div>
    </div>
  );
}
```

**Step 2: 로그인 페이지 작성**

`src/app/(auth)/login/page.tsx`:

```typescript
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCredentialsLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      setLoading(false);
    } else {
      window.location.href = "/nodi-edge";
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    await signIn("google", { callbackUrl: "/nodi-edge" });
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Image
          src="/nodi-logo-symbol.png"
          alt="nodi"
          width={48}
          height={48}
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold">로그인</h1>
        <p className="text-[var(--muted)] mt-2">nodi cloud에 오신 것을 환영합니다</p>
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[var(--border)] rounded-lg hover:bg-[var(--card-hover)] transition-colors disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Google로 로그인
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border)]"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[var(--background)] text-[var(--muted)]">또는</span>
        </div>
      </div>

      <form onSubmit={handleCredentialsLogin} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
            placeholder="••••••••"
          />
        </div>

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm text-[var(--accent)] hover:underline">
            비밀번호를 잊으셨나요?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90 transition-colors disabled:opacity-50"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
```

**Step 3: 디렉토리 생성 및 커밋**

```bash
mkdir -p src/app/\(auth\)/login
git add src/app/\(auth\)/
git commit -m "feat: add login page with Google OAuth and credentials"
```

---

### Task 8: 초대 가입 페이지

**Files:**
- Create: `src/app/(auth)/signup/[token]/page.tsx`

**Step 1: 가입 페이지 작성**

`src/app/(auth)/signup/[token]/page.tsx`:

```typescript
"use client";

import { useState, useEffect, use } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface InvitationData {
  valid: boolean;
  customerName?: string;
  error?: string;
}

export default function SignupPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function validateToken() {
      const res = await fetch(`/api/invitations/${token}`);
      const data = await res.json();
      setInvitation(data);
    }
    validateToken();
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, email, password, name }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "가입 중 오류가 발생했습니다.");
      setLoading(false);
      return;
    }

    // 가입 성공 후 로그인
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/nodi-edge",
    });
  }

  async function handleGoogleSignup() {
    setLoading(true);
    // 토큰을 세션에 저장하고 OAuth 진행
    sessionStorage.setItem("invitationToken", token);
    await signIn("google", { callbackUrl: `/api/auth/complete-signup?token=${token}` });
  }

  if (!invitation) {
    return (
      <div className="text-center">
        <p className="text-[var(--muted)]">초대 링크 확인 중...</p>
      </div>
    );
  }

  if (!invitation.valid) {
    return (
      <div className="text-center space-y-4">
        <Image
          src="/nodi-logo-symbol.png"
          alt="nodi"
          width={48}
          height={48}
          className="mx-auto"
        />
        <h1 className="text-2xl font-semibold">유효하지 않은 초대</h1>
        <p className="text-[var(--muted)]">{invitation.error || "초대 링크가 만료되었거나 유효하지 않습니다."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Image
          src="/nodi-logo-symbol.png"
          alt="nodi"
          width={48}
          height={48}
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold">가입하기</h1>
        <p className="text-[var(--muted)] mt-2">
          <span className="text-[var(--foreground)]">{invitation.customerName}</span>에 초대되었습니다
        </p>
      </div>

      <button
        onClick={handleGoogleSignup}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[var(--border)] rounded-lg hover:bg-[var(--card-hover)] transition-colors disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Google로 가입
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border)]"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[var(--background)] text-[var(--muted)]">또는</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            이름
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
            placeholder="홍길동"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
            placeholder="8자 이상"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
            비밀번호 확인
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
            placeholder="비밀번호 재입력"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90 transition-colors disabled:opacity-50"
        >
          {loading ? "가입 중..." : "가입하기"}
        </button>
      </form>
    </div>
  );
}
```

**Step 2: 커밋**

```bash
mkdir -p src/app/\(auth\)/signup/\[token\]
git add src/app/\(auth\)/signup/
git commit -m "feat: add invitation signup page"
```

---

### Task 9: 비밀번호 재설정 페이지

**Files:**
- Create: `src/app/(auth)/forgot-password/page.tsx`
- Create: `src/app/(auth)/reset-password/[token]/page.tsx`

**Step 1: 비밀번호 재설정 요청 페이지**

`src/app/(auth)/forgot-password/page.tsx`:

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/password-reset/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="text-center space-y-4">
        <Image
          src="/nodi-logo-symbol.png"
          alt="nodi"
          width={48}
          height={48}
          className="mx-auto"
        />
        <h1 className="text-2xl font-semibold">이메일을 확인하세요</h1>
        <p className="text-[var(--muted)]">
          입력하신 이메일로 비밀번호 재설정 링크를 보냈습니다.
        </p>
        <Link href="/login" className="text-[var(--accent)] hover:underline">
          로그인으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Image
          src="/nodi-logo-symbol.png"
          alt="nodi"
          width={48}
          height={48}
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold">비밀번호 재설정</h1>
        <p className="text-[var(--muted)] mt-2">가입한 이메일을 입력하세요</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
            placeholder="name@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90 transition-colors disabled:opacity-50"
        >
          {loading ? "전송 중..." : "재설정 링크 보내기"}
        </button>

        <div className="text-center">
          <Link href="/login" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
            로그인으로 돌아가기
          </Link>
        </div>
      </form>
    </div>
  );
}
```

**Step 2: 비밀번호 재설정 페이지**

`src/app/(auth)/reset-password/[token]/page.tsx`:

```typescript
"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/password-reset/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "비밀번호 재설정 중 오류가 발생했습니다.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <Image
          src="/nodi-logo-symbol.png"
          alt="nodi"
          width={48}
          height={48}
          className="mx-auto"
        />
        <h1 className="text-2xl font-semibold">비밀번호가 변경되었습니다</h1>
        <p className="text-[var(--muted)]">새 비밀번호로 로그인하세요.</p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90 transition-colors"
        >
          로그인하기
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Image
          src="/nodi-logo-symbol.png"
          alt="nodi"
          width={48}
          height={48}
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold">새 비밀번호 설정</h1>
        <p className="text-[var(--muted)] mt-2">새로운 비밀번호를 입력하세요</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            새 비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
            placeholder="8자 이상"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
            비밀번호 확인
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
            placeholder="비밀번호 재입력"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90 transition-colors disabled:opacity-50"
        >
          {loading ? "변경 중..." : "비밀번호 변경"}
        </button>
      </form>
    </div>
  );
}
```

**Step 3: 커밋**

```bash
mkdir -p src/app/\(auth\)/forgot-password src/app/\(auth\)/reset-password/\[token\]
git add src/app/\(auth\)/forgot-password src/app/\(auth\)/reset-password
git commit -m "feat: add password reset pages"
```

---

## Phase 4: API 라우트

### Task 10: 가입 API

**Files:**
- Create: `src/app/api/auth/signup/route.ts`

**Step 1: 가입 API 작성**

`src/app/api/auth/signup/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";
import { hashEmail, encryptEmail } from "@/lib/crypto";

export async function POST(request: NextRequest) {
  const { token, email, password, name } = await request.json();

  // 초대 토큰 검증
  const invitation = await prisma.invitation.findUnique({
    where: { token },
    include: { customer: true },
  });

  if (!invitation) {
    return NextResponse.json({ error: "유효하지 않은 초대 링크입니다." }, { status: 400 });
  }

  if (invitation.acceptedAt) {
    return NextResponse.json({ error: "이미 사용된 초대 링크입니다." }, { status: 400 });
  }

  if (invitation.expiresAt < new Date()) {
    return NextResponse.json({ error: "만료된 초대 링크입니다." }, { status: 400 });
  }

  // 이메일 중복 확인
  const emailHash = hashEmail(email);
  const existingUser = await prisma.user.findUnique({
    where: { email: emailHash },
  });

  if (existingUser) {
    return NextResponse.json({ error: "이미 가입된 이메일입니다." }, { status: 400 });
  }

  // 사용자 생성
  const passwordHash = await hash(password, 12);
  const emailEncrypted = encryptEmail(email);

  await prisma.$transaction([
    prisma.user.create({
      data: {
        email: emailHash,
        emailEncrypted,
        name,
        password: passwordHash,
        role: invitation.role,
        customerId: invitation.customerId,
      },
    }),
    prisma.invitation.update({
      where: { id: invitation.id },
      data: { acceptedAt: new Date() },
    }),
  ]);

  return NextResponse.json({ success: true });
}
```

**Step 2: 커밋**

```bash
mkdir -p src/app/api/auth/signup
git add src/app/api/auth/signup/route.ts
git commit -m "feat: add signup API endpoint"
```

---

### Task 11: 초대 검증 API

**Files:**
- Create: `src/app/api/invitations/[token]/route.ts`

**Step 1: 초대 검증 API 작성**

`src/app/api/invitations/[token]/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: { token },
    include: { customer: true },
  });

  if (!invitation) {
    return NextResponse.json({ valid: false, error: "초대 링크를 찾을 수 없습니다." });
  }

  if (invitation.acceptedAt) {
    return NextResponse.json({ valid: false, error: "이미 사용된 초대 링크입니다." });
  }

  if (invitation.expiresAt < new Date()) {
    return NextResponse.json({ valid: false, error: "만료된 초대 링크입니다." });
  }

  return NextResponse.json({
    valid: true,
    customerName: invitation.customer.name,
  });
}
```

**Step 2: 커밋**

```bash
mkdir -p src/app/api/invitations/\[token\]
git add src/app/api/invitations/
git commit -m "feat: add invitation validation API"
```

---

### Task 12: 비밀번호 재설정 API

**Files:**
- Create: `src/app/api/password-reset/request/route.ts`
- Create: `src/app/api/password-reset/reset/route.ts`
- Create: `src/lib/email.ts`

**Step 1: 이메일 유틸리티 작성**

`src/lib/email.ts`:

```typescript
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;
  const fromEmail = process.env.SES_FROM_EMAIL!;

  const command = new SendEmailCommand({
    Source: fromEmail,
    Destination: { ToAddresses: [email] },
    Message: {
      Subject: { Data: "[nodi cloud] 비밀번호 재설정" },
      Body: {
        Html: {
          Data: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>비밀번호 재설정</h2>
              <p>아래 버튼을 클릭하여 비밀번호를 재설정하세요.</p>
              <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #00FFDD; color: black; text-decoration: none; border-radius: 8px; font-weight: 500;">
                비밀번호 재설정
              </a>
              <p style="margin-top: 24px; color: #666;">이 링크는 1시간 후 만료됩니다.</p>
              <p style="color: #666;">본인이 요청하지 않았다면 이 이메일을 무시하세요.</p>
            </div>
          `,
        },
        Text: {
          Data: `비밀번호 재설정\n\n아래 링크를 클릭하여 비밀번호를 재설정하세요:\n${resetUrl}\n\n이 링크는 1시간 후 만료됩니다.`,
        },
      },
    },
  });

  await ses.send(command);
}
```

**Step 2: 재설정 요청 API**

`src/app/api/password-reset/request/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashEmail, decryptEmail, generateToken } from "@/lib/crypto";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const emailHash = hashEmail(email);
  const user = await prisma.user.findUnique({
    where: { email: emailHash },
  });

  // 사용자가 없어도 성공 응답 (보안)
  if (!user) {
    return NextResponse.json({ success: true });
  }

  // 기존 토큰 삭제
  await prisma.passwordResetToken.deleteMany({
    where: { email: emailHash },
  });

  // 새 토큰 생성
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1시간

  await prisma.passwordResetToken.create({
    data: {
      token,
      email: emailHash,
      expiresAt,
    },
  });

  // 이메일 발송
  const decryptedEmail = decryptEmail(user.emailEncrypted);
  await sendPasswordResetEmail(decryptedEmail, token);

  return NextResponse.json({ success: true });
}
```

**Step 3: 비밀번호 재설정 API**

`src/app/api/password-reset/reset/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { token, password } = await request.json();

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetToken) {
    return NextResponse.json({ error: "유효하지 않은 링크입니다." }, { status: 400 });
  }

  if (resetToken.usedAt) {
    return NextResponse.json({ error: "이미 사용된 링크입니다." }, { status: 400 });
  }

  if (resetToken.expiresAt < new Date()) {
    return NextResponse.json({ error: "만료된 링크입니다." }, { status: 400 });
  }

  const passwordHash = await hash(password, 12);

  await prisma.$transaction([
    prisma.user.update({
      where: { email: resetToken.email },
      data: { password: passwordHash },
    }),
    prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() },
    }),
  ]);

  return NextResponse.json({ success: true });
}
```

**Step 4: 커밋**

```bash
mkdir -p src/app/api/password-reset/request src/app/api/password-reset/reset
git add src/lib/email.ts src/app/api/password-reset/
git commit -m "feat: add password reset API endpoints"
```

---

## Phase 5: 라우트 변경 및 권한 적용

### Task 13: gateways → nodi-edge 라우트 변경

**Files:**
- Rename: `src/app/(dashboard)/gateways/` → `src/app/(dashboard)/nodi-edge/`

**Step 1: 디렉토리 이름 변경**

```bash
mv src/app/\(dashboard\)/gateways src/app/\(dashboard\)/nodi-edge
```

**Step 2: 커밋**

```bash
git add -A
git commit -m "refactor: rename gateways to nodi-edge routes"
```

---

### Task 14: 대시보드 레이아웃에 인증 정보 추가

**Files:**
- Modify: `src/app/(dashboard)/layout.tsx`

**Step 1: 레이아웃 수정**

기존 레이아웃에 세션 정보와 로그아웃 버튼 추가. `src/app/(dashboard)/layout.tsx` 파일을 세션 기반으로 수정:

```typescript
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const navItems = [
    { href: "/nodi-edge", label: "nodi-edge", icon: "⬡" },
    { href: "/integrations", label: "Integrations", icon: "◈" },
    { href: "/settings", label: "Settings", icon: "⚙" },
  ];

  // 관리자면 admin 메뉴 추가
  if (session.user.role === "ADMIN") {
    navItems.push({ href: "/admin/customers", label: "Admin", icon: "👤" });
  }

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-60 border-r border-[var(--border)] bg-[var(--card)] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[var(--border)]">
          <Link href="/nodi-edge" className="flex items-center gap-3">
            <Image src="/nodi-logo-symbol.png" alt="nodi" width={32} height={32} />
            <span className="font-semibold text-lg">nodi cloud</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-hover)] transition-colors"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User */}
        <div className="p-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-black font-medium">
              {session.user.name?.[0] || session.user.email[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{session.user.name || "User"}</p>
              <p className="text-xs text-[var(--muted)] truncate">{session.user.email}</p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="w-full mt-2 px-4 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-hover)] rounded-lg transition-colors text-left"
            >
              로그아웃
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-60">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
```

**Step 2: 커밋**

```bash
git add src/app/\(dashboard\)/layout.tsx
git commit -m "feat: add auth session to dashboard layout"
```

---

## Phase 6: 관리자 페이지

### Task 15: 관리자 레이아웃

**Files:**
- Create: `src/app/(admin)/layout.tsx`

**Step 1: 관리자 레이아웃 작성**

`src/app/(admin)/layout.tsx`:

```typescript
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/nodi-edge");
  }

  const navItems = [
    { href: "/admin/customers", label: "고객 관리" },
    { href: "/admin/users", label: "사용자 관리" },
    { href: "/admin/nodi-edge", label: "게이트웨이 관리" },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/nodi-edge" className="flex items-center gap-3">
              <Image src="/nodi-logo-symbol.png" alt="nodi" width={32} height={32} />
              <span className="font-semibold">nodi cloud</span>
            </Link>
            <span className="text-[var(--muted)]">/</span>
            <span className="text-[var(--accent)]">Admin</span>
          </div>

          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/nodi-edge"
              className="text-sm px-4 py-2 border border-[var(--border)] rounded-full hover:bg-[var(--card-hover)] transition-colors"
            >
              대시보드로
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
```

**Step 2: 커밋**

```bash
mkdir -p src/app/\(admin\)
git add src/app/\(admin\)/layout.tsx
git commit -m "feat: add admin layout with navigation"
```

---

### Task 16: 고객 관리 페이지

**Files:**
- Create: `src/app/(admin)/customers/page.tsx`
- Create: `src/app/(admin)/customers/[id]/page.tsx`
- Create: `src/app/api/customers/route.ts`
- Create: `src/app/api/invitations/route.ts`

**Step 1: 고객 목록 API**

`src/app/api/customers/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";

  const customers = await prisma.customer.findMany({
    where: search
      ? {
          OR: [
            { code: { contains: search, mode: "insensitive" } },
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : undefined,
    include: {
      _count: { select: { users: true, gateways: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(customers);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { code, name, description } = await request.json();

  const existing = await prisma.customer.findUnique({ where: { code } });
  if (existing) {
    return NextResponse.json({ error: "이미 존재하는 고객 코드입니다." }, { status: 400 });
  }

  const customer = await prisma.customer.create({
    data: { code, name, description },
  });

  return NextResponse.json(customer);
}
```

**Step 2: 초대 생성 API**

`src/app/api/invitations/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/crypto";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { customerId, role = "USER", expiresInDays = 7 } = await request.json();

  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  if (!customer) {
    return NextResponse.json({ error: "고객을 찾을 수 없습니다." }, { status: 404 });
  }

  const token = generateToken();
  const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);

  const invitation = await prisma.invitation.create({
    data: {
      token,
      customerId,
      role,
      invitedBy: session.user.id,
      expiresAt,
    },
  });

  const inviteUrl = `${process.env.NEXTAUTH_URL}/signup/${invitation.token}`;

  return NextResponse.json({ invitation, inviteUrl });
}
```

**Step 3: 고객 목록 페이지**

`src/app/(admin)/customers/page.tsx`:

```typescript
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Customer {
  id: string;
  code: string;
  name: string;
  description: string | null;
  createdAt: string;
  _count: { users: number; gateways: number };
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ code: "", name: "", description: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, [search]);

  async function fetchCustomers() {
    setLoading(true);
    const res = await fetch(`/api/customers?search=${encodeURIComponent(search)}`);
    const data = await res.json();
    setCustomers(data);
    setLoading(false);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    });

    if (res.ok) {
      setShowCreateModal(false);
      setNewCustomer({ code: "", name: "", description: "" });
      fetchCustomers();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">고객 관리</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90 transition-colors"
        >
          고객 추가
        </button>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="코드, 이름, 설명으로 검색..."
          className="flex-1 px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
        />
      </div>

      <div className="border border-[var(--border)] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[var(--card)]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">코드</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">이름</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">설명</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">사용자</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">게이트웨이</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-[var(--muted)]">
                  로딩 중...
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-[var(--muted)]">
                  고객이 없습니다.
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-[var(--card-hover)]">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/customers/${customer.id}`}
                      className="font-mono text-[var(--accent)] hover:underline"
                    >
                      {customer.code}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{customer.name}</td>
                  <td className="px-6 py-4 text-[var(--muted)]">{customer.description || "-"}</td>
                  <td className="px-6 py-4">{customer._count.users}</td>
                  <td className="px-6 py-4">{customer._count.gateways}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--card)] rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">고객 추가</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">고객 코드</label>
                <input
                  type="text"
                  value={newCustomer.code}
                  onChange={(e) => setNewCustomer({ ...newCustomer, code: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg"
                  placeholder="ACME-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">고객 이름</label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg"
                  placeholder="ACME 제조"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">설명 (선택)</label>
                <textarea
                  value={newCustomer.description}
                  onChange={(e) => setNewCustomer({ ...newCustomer, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg"
                  placeholder="관리자 메모"
                  rows={3}
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--card-hover)]"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90"
                >
                  추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
```

**Step 4: 고객 상세 페이지**

`src/app/(admin)/customers/[id]/page.tsx`:

```typescript
"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";

interface Customer {
  id: string;
  code: string;
  name: string;
  description: string | null;
  users: { id: string; name: string | null; email: string; role: string }[];
  gateways: { id: string; serial: string }[];
  invitations: { id: string; token: string; expiresAt: string; acceptedAt: string | null }[];
}

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [inviteUrl, setInviteUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  async function fetchCustomer() {
    const res = await fetch(`/api/customers/${id}`);
    const data = await res.json();
    setCustomer(data);
    setLoading(false);
  }

  async function createInvitation() {
    const res = await fetch("/api/invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: id }),
    });
    const data = await res.json();
    setInviteUrl(data.inviteUrl);
    fetchCustomer();
  }

  async function copyInviteUrl() {
    await navigator.clipboard.writeText(inviteUrl);
  }

  if (loading) {
    return <div className="text-center py-8 text-[var(--muted)]">로딩 중...</div>;
  }

  if (!customer) {
    return <div className="text-center py-8 text-[var(--muted)]">고객을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/customers" className="text-[var(--muted)] hover:text-[var(--foreground)]">
          ← 목록으로
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{customer.name}</h1>
          <p className="text-[var(--muted)] font-mono">{customer.code}</p>
          {customer.description && <p className="mt-2 text-[var(--muted)]">{customer.description}</p>}
        </div>
      </div>

      {/* Invite Section */}
      <div className="p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl space-y-4">
        <h2 className="text-lg font-medium">초대 링크</h2>
        <div className="flex gap-3">
          <button
            onClick={createInvitation}
            className="px-4 py-2 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90"
          >
            새 초대 링크 생성
          </button>
        </div>
        {inviteUrl && (
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={inviteUrl}
              readOnly
              className="flex-1 px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg font-mono text-sm"
            />
            <button
              onClick={copyInviteUrl}
              className="px-4 py-3 border border-[var(--border)] rounded-lg hover:bg-[var(--card-hover)]"
            >
              복사
            </button>
          </div>
        )}
      </div>

      {/* Users */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">사용자 ({customer.users.length})</h2>
        {customer.users.length === 0 ? (
          <p className="text-[var(--muted)]">연결된 사용자가 없습니다.</p>
        ) : (
          <div className="border border-[var(--border)] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[var(--card)]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">이름</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">이메일</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">역할</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {customer.users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4">{user.name || "-"}</td>
                    <td className="px-6 py-4 font-mono text-sm">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${user.role === "ADMIN" ? "bg-[var(--accent)]/20 text-[var(--accent)]" : "bg-[var(--muted)]/20"}`}>
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Gateways */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">게이트웨이 ({customer.gateways.length})</h2>
        {customer.gateways.length === 0 ? (
          <p className="text-[var(--muted)]">연결된 게이트웨이가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {customer.gateways.map((gw) => (
              <div key={gw.id} className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg">
                <span className="font-mono">{gw.serial}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 5: 고객 상세 API**

`src/app/api/customers/[id]/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { decryptEmail } from "@/lib/crypto";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      users: { select: { id: true, name: true, emailEncrypted: true, role: true } },
      gateways: { select: { id: true, serial: true } },
      invitations: {
        where: { acceptedAt: null },
        select: { id: true, token: true, expiresAt: true, acceptedAt: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  // 이메일 복호화
  const usersWithEmail = customer.users.map((user) => ({
    ...user,
    email: decryptEmail(user.emailEncrypted),
    emailEncrypted: undefined,
  }));

  return NextResponse.json({ ...customer, users: usersWithEmail });
}
```

**Step 6: 커밋**

```bash
mkdir -p src/app/\(admin\)/customers/\[id\] src/app/api/customers/\[id\]
git add src/app/\(admin\)/customers src/app/api/customers src/app/api/invitations/route.ts
git commit -m "feat: add customer management pages and APIs"
```

---

## Phase 7: 최종 점검

### Task 17: 빌드 및 테스트

**Step 1: Prisma 클라이언트 생성**

```bash
npx prisma generate
```

**Step 2: 빌드 테스트**

```bash
npm run build
```

Expected: 빌드 성공

**Step 3: 린트 확인**

```bash
npm run lint
```

Expected: 에러 없음

**Step 4: 최종 커밋**

```bash
git add -A
git commit -m "chore: final build verification"
```

---

## 완료 체크리스트

- [ ] 의존성 설치 (next-auth, prisma, bcrypt, aws-ses)
- [ ] Prisma 스키마 작성 및 클라이언트 생성
- [ ] 이메일 암호화 유틸리티
- [ ] NextAuth.js 설정 (Google + Credentials)
- [ ] 미들웨어 (라우트 보호)
- [ ] 로그인 페이지
- [ ] 초대 가입 페이지
- [ ] 비밀번호 재설정 페이지
- [ ] 가입/초대 검증/비밀번호 재설정 API
- [ ] gateways → nodi-edge 라우트 변경
- [ ] 대시보드 레이아웃 인증 정보 추가
- [ ] 관리자 레이아웃
- [ ] 고객 관리 페이지 (목록/상세)
- [ ] 빌드 및 린트 확인
