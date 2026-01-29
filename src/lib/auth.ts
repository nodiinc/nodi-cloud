import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import { prisma } from "./prisma";
import { hashEmail, decryptEmail } from "./crypto";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
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
