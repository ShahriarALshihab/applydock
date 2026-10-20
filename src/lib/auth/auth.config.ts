import type { NextAuthConfig } from "next-auth";

/**
 * Edge-compatible NextAuth configuration (used by Middleware)
 * Does NOT import Node.js-only modules like pg or bcrypt
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register");
      const isProtectedPage =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/applications") ||
        nextUrl.pathname.startsWith("/skills") ||
        nextUrl.pathname.startsWith("/learning") ||
        nextUrl.pathname.startsWith("/settings");

      if (isLoggedIn && isAuthPage) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (!isLoggedIn && isProtectedPage) {
        const callbackUrl = encodeURIComponent(nextUrl.pathname);
        return Response.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
