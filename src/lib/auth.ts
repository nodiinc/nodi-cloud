import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import { prisma } from "./prisma";
import { hashEmail, decryptEmail } from "./crypto";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  providers: [
    ...authConfig.providers,
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.customerId = user.customerId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.customerId = token.customerId as string | null;
      }
      return session;
    },
  },
});
