import { fetchIMISUserProfile } from "@/app/api/imis/utils";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  // session: {
  //   strategy: "jwt", // Use JWT tokens instead of database sessions
  //   maxAge: 0, // This makes the session last only for the browser session
  // },
  cookies: {
    sessionToken: {
      // Use the secure cookie name in production, otherwise the default dev name.
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        // do not set `maxAge` or `expires` -> makes it a session cookie
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  providers: [
    CredentialsProvider({
      id: "imis",
      name: "iMIS",
      credentials: {
        token: { label: "Token", type: "text" },
        userName: { label: "UserName", type: "text" },
      },
      async authorize(credentials) {
        try {
          const token = credentials?.token;
          const userName = credentials?.userName;

          if (!token) {
            return null;
          }

          if (!userName) {
            return null;
          }

          const user = await fetchIMISUserProfile(token, userName);

          return {
            id: user.Items?.$values[0]?.Party?.PartyId,
            name: user.Items?.$values[0]?.Party?.Name,
            email: user.Items?.$values[0]?.Party?.Email,
            accessToken: token,
            userName: userName,
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
        token.userName = user.userName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.userId as string;
        session.user.email = token.email as string;
        session.user.userName = token.userName as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
  },
  pages: {
    error: "/auth/error",
    signIn: "/auth/signin",
  },
  debug: process.env.NODE_ENV === "development",
};
