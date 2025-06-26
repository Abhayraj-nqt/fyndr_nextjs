import { Currency, CurrencySymbol } from "../global";
import {
  Address,
  EntityRole,
  EntityType,
  Gender,
  Location,
  RegMode,
  Settings,
} from "./auth.types";
import { PaymentMethod } from "../payment/payment.types";

export type SignInResponse = any;

export type GetAccountResponse = {
  accountStatus: "ACTIVE" | "DELETED" | string;
  addonUrl: string | null;
  address: Address;
  bizName: null | string;
  bizType: null | string;
  bizid: null | number;
  businessWorkingHoursAndSlotsList: null | unknown;
  chargesEnabled: null | unknown;
  countryId: number;
  currency: Currency;
  currencySymbol: CurrencySymbol;
  custid: null | string | unknown;
  detailsSubmitted: null | unknown;
  deviceToken: null | string;
  displayName: string;
  email: string;
  entityRole: EntityRole;
  entityType: EntityType;
  firstName: string;
  lastName: string;
  fyndrHandle: string;
  gender: Gender;
  googleCalendarPermissionGranted: boolean;
  identity: string;
  indvid: number;
  isBusiness: boolean;
  isSubscribedToFyndrPromoEmails: boolean;
  locations: null | Location[];
  mainLogo: null | string;
  merchantAllowed: boolean;
  merchantId: null | unknown;
  payoutsEnabled: null | unknown;
  pmethod: PaymentMethod[] | null;
  promoCode: null | unknown;
  qrLogo: string;
  qrid: number | unknown;
  referralCode: string | unknown;
  regMode: RegMode;
  setting: Settings[];
  showBiz: null | unknown;
  subscription: null | unknown;
  tags: null | string;
  taxnbr: null | unknown;
  term: null | unknown;
  userTimeZone: string;
  website: string | null;
  yob: string | null;
  stripeAccountType: string | "EXPRESS";
};

export type GenerateTokenResponse = {
  accessCode: string;
  accessCodeExpiry: number;
  refreshToken: string;
  email: string;
};

export type RefreshTokenResponse = GenerateTokenResponse;

export type SignInWithCredentialsResponse = any;

export type SignUpResponse = GetAccountResponse;

export type SignOutResponse = void;

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
