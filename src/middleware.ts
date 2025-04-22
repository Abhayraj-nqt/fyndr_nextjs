// export { auth as middleware } from "@/auth";
import { auth } from "@/auth";

import ROUTES, { PUBLIC_ROUTES } from "./constants/routes";

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  // if (isPublicRoute && isAuthenticated)
  //  return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL(ROUTES.HOME, nextUrl));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
