import { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
    maxAge: 72 * 60 * 60, // 72 hours // 3 days
  },
  providers: [],
};
