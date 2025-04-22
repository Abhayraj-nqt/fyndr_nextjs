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
};

export const PUBLIC_ROUTES = [
  "/",
  "/about-us",
  "/sign-in",
  "/sign-up",
  "/offers",
];

export default ROUTES;
