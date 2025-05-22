import { slugify } from "@/lib/utils";

const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  SIGN_UP_COMPLETE: "/sign-up/complete",
  RESET_PASSWORD: "/reset-password",
  WALLET: "/wallet",
  ABOUT_US: "/about-us",
  MY_OFFERS: "/my-offers",
  OFFERS_AND_EVENTS: "/offers-and-events",
  OFFER_LISTING: "/offer-listing",
  PROFILE: `/profile`,
  OFFER_DETAILS: (bizName: string, qrCode: string) =>
    slugify(`/offer-details/${bizName}/${qrCode}`),
  STORE: (id: number | string) => `/store/${id}`,

  // Legal routes
  LEGAL_TERMS: "/legal/terms",
  LEGAL_privacy: "/legal/privacy",
  LEGAL_AGREEMENT: "/legal/agreement",

  // Business routes
  BUSINESS_DASHBOARD: "/business/billing/transaction",
  BUSINESS_CAMPAIGNS: "/business/campaign",
  BUSINESS_CAMPAIGN_CREATE: "/business/campaign/create",
  BUSINESS_CAMPAIGN_EDIT: (id: number | string) =>
    `/business/campaign/edit/${id}`,
  BUSINESS_STRIPE_CONNECT: "/business/payment/stripe-connect",
  BUSINESS_PAYMENT_METHODS: "/business/payment/methods",
  BUSINESS_STORE: "/business/store",
  BUSINESS_STORE_CREATE: "/business/store/create",
  BUSINESS_STORE_EDIT: (id: number | string) => `/business/store/edit/${id}`,
  BUSINESS_STORE_CATEGORY: "/business/store/category",
  BUSINESS_STORE_CATEGORY_CREATE: "/business/store/category/create",
  BUSINESS_STORE_CATEGORY_EDIT: (id: number | string) =>
    `/business/store/category/edit/${id}`,
  BUSINESS_STORE_ITEM: "/business/store/item",
  BUSINESS_STORE_ITEM_CREATE: "/business/store/item/create",
  BUSINESS_STORE_ITEM_EDIT: (id: number | string) =>
    `/business/store/item/edit/${id}`,
  BUSINESS_STORE_MODIFIER: "/business/store/modifier",
  BUSINESS_STORE_MODIFIER_CREATE: "/business/store/modifier/create",
  BUSINESS_STORE_MODIFIER_EDIT: (id: number | string) =>
    `/business/store/modifier/edit/${id}`,
  BUSINESS_ACCOUNT_LOGO: "/business/account/logo",
  BUSINESS_ACCOUNT_QR: "/business/account/qr",
  BUSINESS_ACCOUNT_LOCATION: "/business/account/location",
  BUSINESS_ACCOUNT_LOCATION_CREATE: "/business/account/location/create",
  BUSINESS_ACCOUNT_LOCATION_EDIT: (id: string | number) =>
    `/business/account/location/${id}`,
  BUSINESS_ACCOUNT_OFFER_SUMMARY: "/business/account/offer-summary",
  BUSINESS_ACCOUNT_APPOINTMENT: "/business/account/appointment",
  BUSINESS_ACCOUNT_CUSTOM_EMAIL: "/business/account/custom-email",
  BUSINESS_DISPUTE: "/business/dispute",

  // Admin routes
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USER_DETAILS: "/admin/user-details",
  ADMIN_MANAGEMENT: "/admin/management",
  ADMIN_REGISTRATION_RECORDS: "/admin/registration-records",
  ADMIN_PROMOCODES: "/admin/promos",
  ADMIN_CAMPAIGNS: "/admin/campaigns",
  ADMIN_REVENUE: "/admin/revenue",
  ADMIN_DISPUTE: "/admin/dispute",
  ADMIN_PLATFORM_VARIABLES: "/admin/platform-variable",
  ADMIN_COMMENTS_REPORTS: "/admin/comments-and-reports",

  // Support routes
  SUPPORT_DASHBOARD: "/support/dashboard",

  // CAllback routes
  CALLBACK_SIGN_IN: "/callback/sign-in",
  STORE_ADD_CATEGORY: "/business/catalogue/categories/add",
  STORE_MODIFIERS: "/business/catalogue/modifiers",
  STORE_ITEMS: "/business/catalogue/items",
  STORE_CATEGORY: "/business/catalogue/categories",
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
  { path: ROUTES.BUSINESS_DASHBOARD, roles: ["BIZ_ADMIN", "SUPER_ADMIN"] },
  { path: "/admin", roles: ["SUPER_ADMIN"] },
  { path: ROUTES.SUPPORT_DASHBOARD, roles: ["FYNDR_SUPPORT", "SUPER_ADMIN"] },
];

export default ROUTES;
