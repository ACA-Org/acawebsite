import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchIMISUserProfile } from "../../imis/utils";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    userId?: string;
  }
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "imis",
      name: "iMIS",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        console.log("[Auth] Starting authorization process");
        try {
          const token = credentials?.token;
          console.log("[Auth] Token present:", !!token);

          if (!token) {
            console.log("[Auth] No token provided, authorization failed");
            return null;
          }

          console.log("[Auth] Fetching IMIS user profile");
          const user = await fetchIMISUserProfile(token);
          console.log("[Auth] Successfully fetched user profile:", {
            userId: user.id,
            hasEmail: !!user.email,
            hasName: !!user.full_name,
          });

          return {
            id: user.id,
            name: user.full_name,
            email: user.email,
            accessToken: token,
          };
        } catch (error) {
          console.error("[Auth] IMIS authorize error:", error);
          if (error instanceof Error) {
            console.error("[Auth] Error details:", {
              name: error.name,
              message: error.message,
              stack: error.stack,
            });
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.userId = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.userId as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

