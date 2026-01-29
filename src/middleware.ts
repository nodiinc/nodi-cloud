import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);
export default auth;

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
