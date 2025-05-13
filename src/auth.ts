/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import NextAuth, { User } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

import {
  getAccountAPI,
  refreshAccessTokenAPI,
  signInAPI,
} from "@/actions/auth.actions";

import { SignInSchema } from "./components/forms/auth/schema";
import { authConfig } from "./config/auth.config";
import { Coordinates } from "./types/global";

interface UserSession {
  accessToken: string;
  refreshToken: string;

  id: string;
  name: string;
  email: string;
  entityType: EntityType;
  entityRole: EntityRole;
  accountStatus: string;
  bizid: number;

  phone?: string;
  image?: string;

  location: {
    lat: number;
    lng: number;
  };
}

declare module "next-auth" {
  interface Session {
    user: UserSession;
    accessToken?: string;
  }

  interface User {
    accessToken?: string | null | any;
    refreshToken?: string | null | any;
    role?: string | null | any;
    accountStatus?: string | null | any;
    phone?: string | null | any;
    location?: Coordinates | null | any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // session: {
  //   strategy: "jwt",
  //   maxAge: 72 * 60 * 60, // 72 hours // 3 days
  // },

  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          try {
            const {
              headers: signInHeaders,
              success: signInSuccess,
              data: signInData,
            } = await signInAPI({
              email,
              password,
              mode: "classic",
            });

            if (!signInSuccess || !signInHeaders || !signInData) return null;

            const accessToken = signInHeaders.get("x-auth-fyndr-code");
            const refreshToken = signInHeaders.get("x-auth-fyndr-refresh-code");

            if (!accessToken) return null;

            const { success, data: parsedAccountResponse } =
              await getAccountAPI({
                email,
                regMode: "classic",
                accessToken,
              });

            if (!success || !parsedAccountResponse) return null;

            if (parsedAccountResponse.accountStatus === "DELETED") {
              return null;
            }

            const {
              indvid,
              firstName,
              lastName,
              email: userEmail,
              entityRole,
              entityType,
              address,
              accountStatus,
              bizid,
            } = parsedAccountResponse;

            console.log("ppp", parsedAccountResponse.bizid);

            const id = indvid.toString();
            const name = `${firstName} ${lastName}`;

            return {
              accessToken,
              refreshToken,
              id,
              name,
              email: userEmail,
              entityRole,
              entityType,
              accountStatus,
              location: {
                lat: address.lat,
                lng: address.lng,
              },
              phone: address.phone,
              bizid,
            } as User;
          } catch (error) {
            console.log(error);
            return null;
          }
        }

        return null;
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, account, user }) => {
      // user is only available the first time a user signs in authorized
      // console.log(`In jwt callback - Token is ${JSON.stringify(token)}`);

      if (token.accessToken) {
        const decodedToken = jwtDecode(token.accessToken);
        // console.log(decodedToken);
        token.accessTokenExpires = decodedToken?.exp
          ? decodedToken?.exp * 1000
          : undefined;
      }

      if (account && user) {
        // console.log(`In jwt callback - User is ${JSON.stringify(user)}`);
        // console.log(`In jwt callback - account is ${JSON.stringify(account)}`);

        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      // console.log(
      //   "**** Access token expires on *****",
      //   token.accessTokenExpires,
      //   new Date(token.accessTokenExpires)
      // );
      if (Date.now() < (token?.accessTokenExpires || 0)) {
        // console.log("**** returning previous token ******");
        return token;
      }

      // Access token has expired, try to update it
      // console.log("**** Update Refresh token ******");
      // return refreshAccessToken(token);
      return refreshToken(token);
    },

    session: async ({ session, token }) => {
      // console.log(`In session callback - Token is ${JSON.stringify(token)}`);
      if (token) {
        session.accessToken = token.accessToken;
        session.user = token.user as AdapterUser & UserSession;
      }
      return session;
    },
  },
});

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */

// async function refreshAccessToken(token: JWT) {
//   console.log("Refreshing access token", token);
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/v1/token/generateFromRefreshToken`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-fyndr-auth-token": API_TOKEN,
//         },
//         body: JSON.stringify({
//           refreshToken: token.refreshToken,
//         }),
//       }
//     );

//     // console.log(response);

//     const newTokens = await response.json();

//     // console.log(newTokens);

//     if (!response.ok) {
//       throw newTokens;
//     }

//     return {
//       ...token,
//       accessToken: newTokens.accessCode,
//       refreshToken: newTokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
//     };
//   } catch (error) {
//     console.log(error);

//     // return {
//     //   ...token,
//     //   error: "RefreshAccessTokenError",
//     // };
//     return null;
//   }
// }

async function refreshToken(token: JWT) {
  console.log("Refreshing access token", token);
  const { refreshToken } = token;

  if (!refreshToken) {
    return token;
  }

  const { success, data } = await refreshAccessTokenAPI({ refreshToken });

  if (!success || !data) {
    // return token;
    return null;
  }

  return {
    ...token,
    accessToken: data.accessCode,
    refreshToken: data.refreshToken ?? token.refreshToken, // Fall back to old refresh token
  };
}
