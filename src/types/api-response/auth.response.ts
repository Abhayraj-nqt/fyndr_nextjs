import { AddressProps, Currency, CurrencySymbol } from "../global";

export type RefreshTokenResponse = {
  accessCode: string;
  accessCodeExpiry: number;
  refreshToken: string;
  email: string;
};

export type Loction = {
  country: string;
  parentLocation: number;
  qrCode: string;
  city: string;
  postalCode: string;
  objid: number;
  locName: string;
  qrid: number;
  addressLine1: string;
  addressLine2: "";
  catalogueName: string;
  state: string;
};

export type AccountResponse = {
  accountStatus: "ACTIVE" | "DELETED" | string;
  addonUrl: string | null;
  address: AddressProps;
  bizName: null | string;
  bizType: null | string;
  bizid: null | number;
  businessWorkingHoursAndSlotsList: null | unknown;
  chargesEnabled: null | unknown;
  countryId: number;
  currency: Currency;
  currencySymbol: CurrencySymbol;
  custid: string;
  detailsSubmitted: null | unknown;
  deviceToken: null | unknown;
  displayName: string;
  email: string;
  entityRole: EntityRole;
  entityType: EntityType;
  firstName: string;
  lastName: string;
  fyndrHandle: string;
  gender: string | "M";
  googleCalendarPermissionGranted: boolean;
  identity: string;
  indvid: number;
  isBusiness: boolean;
  isSubscribedToFyndrPromoEmails: boolean;
  locations: null | Loction[];
  mainLogo: null | unknown;
  merchantAllowed: boolean;
  merchantId: null | unknown;
  payoutsEnabled: null | unknown;
  pmethod: PaymentMethod[] | unknown;
  promoCode: null | unknown;
  qrLogo: string;
  qrid: number | unknown;
  referralCode: string | unknown;
  regMode: string | "classic";
  setting: unknown[];
  showBiz: null | unknown;
  subscription: null | unknown;
  tags: null | unknown;
  taxnbr: null | unknown;
  term: null | unknown;
  userTimeZone: string;
  website: string | null;
  yob: string;
};

export type ConfirmIdentityResponse = {
  entity: "TOKEN" | string;
  message: string;
  statusCode: null | unknown;
};

export type SendMobileVerificationCodeResponse = {
  message: string;
  promoCodeDetails: null | unknown;
  promocode: boolean;
};

export type VerifyMobileResponse = {
  message: string;
  isPromocode: boolean;
  promoCodeDetails: null | unknown;
};

export type VerifyCodeResponse = {
  message: string;
  promoCodeDetails: null | unknown;
  promocode: boolean;
};
