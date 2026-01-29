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
