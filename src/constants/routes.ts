const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  RESET_PASSWORD: "/reset-password",
  WALLET: "/wallet",
  ABOUT_US: "/about-us",
  MY_OFFERS: "/my-offers",
  OFFERS: "/offers",
  OFFER_LISTING: "/offer-listing",
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
