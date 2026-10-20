import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/applications/:path*",
    "/skills/:path*",
    "/learning/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};
