import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
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
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role === "ADMIN";
      const pathname = nextUrl.pathname;

      const protectedRoutes = ["/nodi-edge", "/settings"];
      const adminRoutes = ["/admin"];
      const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];

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

      // Redirect logged-in users from auth routes
      if (authRoutes.some((route) => pathname.startsWith(route))) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/nodi-edge", nextUrl));
        }
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
