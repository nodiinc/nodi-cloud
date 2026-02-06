import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import { prisma } from "./prisma";
import { hashEmail, decryptEmail, encryptEmail } from "./crypto";
import { authConfig } from "./auth.config";
import { Role } from "@prisma/client";
import { getSettings } from "./settings";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt", maxAge: 365 * 24 * 60 * 60 },
  adapter: PrismaAdapter(prisma),
  providers: [
    ...authConfig.providers,
    // Google OAuth - only enabled if credentials are set
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
              },
            },
          }),
        ]
      : []),
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
    ...authConfig.callbacks,
    async signIn({ user, account, profile }) {
      // OAuth 로그인 시 기존 사용자 확인
      if (account?.provider === "google" && user.email) {
        const emailHash = hashEmail(user.email);
        const existingUser = await prisma.user.findUnique({
          where: { email: emailHash },
        });

        // 기존 사용자가 없으면
        if (!existingUser) {
          // 초대 전용 모드면 로그인 거부
          if (process.env.REGISTRATION_MODE === "invite_only") {
            return false;
          }
          // 아니면 새 사용자 생성
          await prisma.user.create({
            data: {
              email: emailHash,
              emailEncrypted: encryptEmail(user.email),
              name: user.name || profile?.name || "Google User",
              role: Role.OPERATOR,
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.customerId = user.customerId;
        token.loginAt = Math.floor(Date.now() / 1000);
      }

      // Check custom session expiry
      if (token.loginAt) {
        const { sessionMaxAgeDays } = getSettings();
        const maxAge = sessionMaxAgeDays * 24 * 60 * 60;
        const elapsed = Math.floor(Date.now() / 1000) - (token.loginAt as number);
        if (elapsed > maxAge) {
          return { expired: true } as typeof token;
        }
      }

      // Google OAuth 정보 저장
      if (account?.provider === "google") {
        token.provider = "google";
        token.googleProfile = {
          name: profile?.name,
          email: profile?.email,
          picture: (profile as { picture?: string })?.picture,
          locale: (profile as { locale?: string })?.locale,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if ((token as Record<string, unknown>).expired) {
        return {} as typeof session;
      }
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.customerId = token.customerId as string | null;
        // Google OAuth 정보 세션에 추가
        if (token.provider === "google" && token.googleProfile) {
          session.provider = "google";
          session.googleProfile = token.googleProfile as {
            name?: string;
            email?: string;
            picture?: string;
            locale?: string;
          };
        }
      }
      return session;
    },
  },
});

export { Role };

export async function getAdminSession() {
  const session = await auth();
  if (!session || session.user.role !== Role.SUPER_ADMIN) return null;
  return session;
}
