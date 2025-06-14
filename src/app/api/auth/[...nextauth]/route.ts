import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";

// Extend the built-in session type
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

// Extend the built-in JWT type
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}

const authOptions: AuthOptions = {
  providers: [
    {
      id: "imis",
      name: "iMIS",
      type: "oauth",
      clientId: process.env.OAUTH_CLIENT_ID!,
      clientSecret: process.env.OAUTH_SECRET!,
      authorization: {
        url: process.env.OAUTH_AUTHORIZATION_URL!,
        params: {
          response_type: "code",
          scope: "openid profile email",
        },
      },
      token: {
        url: process.env.OAUTH_TOKEN_URL!,
        params: {
          grant_type: "refresh_token",
        },
      },
      userinfo: {
        url: process.env.OAUTH_USERINFO_URL!,
      },
      profile(profile) {
        return {
          id: profile.sub || profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
      // iMIS specific settings
      httpOptions: {
        timeout: 10000,
      },
      // Enable refresh token rotation
      allowDangerousEmailAccountLinking: true,
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Initial sign in
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at! * 1000,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

