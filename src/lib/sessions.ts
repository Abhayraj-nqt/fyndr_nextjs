import "server-only";

import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import handleError from "./handlers/error";

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

export interface SessionPayload {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    imgURL?: string;
    role: "user" | "admin" | "business";
    accountStatus: "active" | "suspended" | "deleted";
    location: {
      addressLine1: string;
      addressLine2: string;
      lat: number;
      lng: number;
      city: string;
      state: string;
      country: string;
      countryCode: string;
      postalCode: string;
      countryId: number;
      currency: string;
      currencySymbol: string;
    };
    fyndrHandle: string;
    qrid: number;
    identity: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

declare module "jose" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface JWTPayload extends SessionPayload {}
}

const cookie = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as "lax" | "strict" | "none",
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function decrypt(jwt: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(jwt, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    handleError(error);
    return null;
  }
}

export async function createSession(sessionPayload: SessionPayload) {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ ...sessionPayload, expires });

  (await cookies()).set(cookie.name, session, { ...cookie.options, expires });
  redirect("/");
}

export async function verifySession() {
  const sessionCookie = (await cookies()).get(cookie.name)?.value;

  if (!sessionCookie) {
    redirect("/sign-in");
  }

  const session = await decrypt(sessionCookie);
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  return { user: session.user };
}

export async function deleteSession() {
  (await cookies()).delete(cookie.name);
  redirect("/sign-in");
}

export async function getSession(): Promise<JWTPayload | null> {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;
  const session = await decrypt(cookie);

  return session;
}
