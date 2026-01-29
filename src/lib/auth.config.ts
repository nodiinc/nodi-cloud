import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role === "ADMIN";
      const pathname = nextUrl.pathname;

      const protectedRoutes = ["/nodi-edge", "/settings"];
      const adminRoutes = ["/admin"];

      // Admin routes require admin role
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
