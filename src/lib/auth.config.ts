import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.customerId = user.customerId;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as "SUPER_ADMIN" | "CUSTOMER_ADMIN" | "OPERATOR" | "VIEWER";
        session.user.customerId = token.customerId as string | null;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role === "SUPER_ADMIN";
      const pathname = nextUrl.pathname;

      const protectedRoutes = ["/dashboard", "/settings"];
      const adminRoutes = ["/admin"];

      // Admin routes require SUPER_ADMIN role
      if (adminRoutes.some((route) => pathname.startsWith(route))) {
        if (!isLoggedIn || !isAdmin) {
          return false;
        }
        return true;
      }

      // Protected routes require login
      if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        return isLoggedIn;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
