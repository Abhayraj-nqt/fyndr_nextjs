import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";

import { authConfig } from "./config/auth.config";
import ROUTES, { PUBLIC_ROUTES } from "./constants/routes";

const { auth } = NextAuth(authConfig);

export async function middleware(request: NextRequest) {
  console.log("\nmiddleware start ----------------------");
  const { nextUrl } = request;
  const session = await auth();
  console.log({ "user session": session });

  const isAuthenticated = !!session?.user;
  console.log({ isAuthenticated, pathname: nextUrl.pathname });

  const isPublicRoute =
    PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROUTES.HOME;

  console.log({ isPublicRoute });

  console.log("middleware end ----------------------\n");

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, nextUrl));
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
