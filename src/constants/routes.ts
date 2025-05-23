import { slugify } from "@/lib/utils";

const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  RESET_PASSWORD: "/reset-password",
  WALLET: "/wallet",
  ABOUT_US: "/about-us",
  MY_OFFERS: "/my-offers",
  OFFERS_AND_EVENTS: "/offers-and-events",
  OFFER_LISTING: "/offer-listing",
  OFFER_DETAILS: (bizName: string, qrCode: string) =>
    slugify(`/offer-details/${bizName}/${qrCode}`),
  PROFILE: (id: string) => `/profile/${id}`,
  PROFILE_EDIT: (id: string) => `/profile/${id}/edit`,

  BUSINESS_DASHBOARD: "/business/billing/transaction",
  ADMIN_DASHBOARD: "/admin/dashboard",
  SUPPORT_DASHBOARD: "/support/dashboard",

  CALLBACK_SIGN_IN: "/callback/sign-in",
};

export const PUBLIC_ROUTES = [
  // Landing, wallet & about routes
  "/",
  "/about-us",
  "/wallet",

  // Auth routes
  "/sign-in",
  "/sign-up",
  "/api/auth/callback/google",

  // Legal routes
  "/agreement",
  "/privacy",
  "/terms",

  // Campaign routes
  "/offers-and-events",
  "/offer-listing",
  "/offer-details/",
];

export const ROLE_BASED_ROUTES: RouteAccess[] = [
  {
    path: ROUTES.BUSINESS_DASHBOARD,
    roles: ["BIZ_ADMIN", "SUPER_ADMIN"],
  },
  {
    path: "/admin",
    roles: ["SUPER_ADMIN"],
  },
  {
    path: ROUTES.SUPPORT_DASHBOARD,
    roles: ["FYNDR_SUPPORT", "SUPER_ADMIN"],
  },
];

export default ROUTES;
