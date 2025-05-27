import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";

import { authConfig } from "./config/auth.config";
import ROUTES, { PUBLIC_ROUTES, ROLE_BASED_ROUTES } from "./constants/routes";

const { auth } = NextAuth(authConfig);

export async function middleware(request: NextRequest) {
  console.log("\nmiddleware start ----------------------");
  // const { nextUrl } = request;
  // const session = await auth();
  // console.log({ "user session": session });

  // const isAuthenticated = !!session?.user;
  // const userRole = session?.user?.entityRole as EntityRole | undefined;

  // console.log({ isAuthenticated, pathname: nextUrl.pathname, userRole });

  // const isPublicRoute =
  //   PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
  //   nextUrl.pathname === ROUTES.HOME;

  // console.log({ isPublicRoute });

  // // Check if the route requires specific role access
  // const restrictedRoute = ROLE_BASED_ROUTES.find((route) =>
  //   nextUrl.pathname.startsWith(route.path)
  // );

  // console.log({ restrictedRoute });

  // // Handle authentication check
  // if (!isAuthenticated && !isPublicRoute) {
  //   console.log("Not authenticated - redirecting to sign in");
  //   return NextResponse.redirect(new URL(ROUTES.SIGN_IN, nextUrl));
  // }

  // // Handle role-based access check
  // if (isAuthenticated && restrictedRoute && userRole) {
  //   const hasAccess = restrictedRoute.roles.includes(userRole);

  //   if (!hasAccess) {
  //     console.log(
  //       `User with role ${userRole} does not have access to ${restrictedRoute.path}`
  //     );
  //     // Redirect to appropriate page based on role or to a forbidden page
  //     return NextResponse.redirect(new URL(ROUTES.HOME, nextUrl));
  //   }
  // }

  console.log("middleware end ----------------------\n");

  // if (!isAuthenticated && !isPublicRoute) {
  //   return NextResponse.redirect(new URL(ROUTES.SIGN_IN, nextUrl));
  // }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
