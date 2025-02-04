import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

const API_TOKEN =
  "xS*KkawsJ36ADKpwbba^Z6g!_f2eanPfz@pKT_2C85Z3q8-#$5Kw@y=#cA%AmR+t";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  secureToken: string;
  expiry: string;
}

interface UserData {
  id: string;
  email: string;
  name: string;
  // Flatten the token structure
  accessToken: string;
  refreshToken: string;
  secureToken: string;
  expiry: string;
  entityRole: string;
  entityType: string;
}

// Extend the built-in session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      image?: string;
      email: string;
      entityType: string;
      entityRole: string;
    };
    tokens: AuthTokens;
    error?: string;
  }
}

// Extend the built-in JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    tokens: AuthTokens;
    entityRole: string;
    entityType: string;
    error?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    Credentials({
      async authorize(credentials: UserData) {
        if (!credentials) return null;

        try {
          const { id, name, email, entityRole, entityType } = credentials;

          const tokens = {
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
            secureToken: credentials.secureToken,
            expiry: credentials.expiry,
          };

          // console.log("auth.js -> ", { tokens });
          // console.log("auth.js -> accessToken -> ", tokens.accessToken);

          return {
            id,
            name,
            email,
            tokens,
            entityRole,
            entityType,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      console.log("INSIDE SESSION CALLBACK -> ", { session, token, user });

      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        entityType: token.entityType,
        entityRole: token.entityRole,
      };

      session.tokens = token.tokens;

      if (token.error) {
        session.error = token.error;
      }

      return session;
    },

    async jwt({ token, user, account, profile, session }) {
      console.log("INSIDE JWT CALLBACK -> ", {
        token,
        user,
        account,
        profile,
        session,
      });

      if (user) {
        token.id = user.id!;
        token.email = user.email!;
        token.name = user.name!;
        token.tokens = user.tokens;
        token.entityRole = user.entityRole;
        token.entityType = user.entityType;
      }

      // Handle token refresh
      if (shouldRefreshToken(token)) {
        return await refreshToken(token);
      }

      return token;
    },
  },
});

// 2. Create token refresh utilities
// lib/auth/token.ts
export async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_AUTH_URL}/v1/token/generateFromRefreshToken`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-fyndr-auth-token": API_TOKEN,
        },
        body: JSON.stringify({
          refreshToken: token.tokens.refreshToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    console.log("refresh token", data);

    return {
      ...token,
      tokens: {
        accessToken: data?.accessCode,
        refreshToken: data?.refreshToken,
        secureToken: data?.tokenHeader,
        expiry: data?.expiry,
      },
    };

    // const newTokens = {
    //   accessToken: response.headers.get("x-auth-fyndr-code") as string,
    //   refreshToken: response.headers.get("x-auth-fyndr-refresh-code") as string,
    //   secureToken: response.headers.get("tokenheader") as string,
    //   expiry: response.headers.get("x-auth-fyndr-expiry") as string,
    // };

    // return {
    //   ...token,
    //   tokens: newTokens,
    // };
  } catch (error) {
    console.error("Error refreshing token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export function shouldRefreshToken(token: JWT) {
  try {
    if (!token.tokens?.accessToken) return false;

    // Get expiry from token header
    const expiry = token.tokens.expiry;
    if (!expiry) return false;

    // Convert expiry to timestamp and add buffer time (5 minutes)
    const expiryDate = new Date(expiry).getTime();
    const shouldRefresh = Date.now() + 5 * 60 * 1000 >= expiryDate;

    return shouldRefresh;
  } catch {
    return false;
  }
}
