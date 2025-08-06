import { Currency, CurrencySymbol } from "../global";
import {
  AccountStatus,
  Address,
  BusinessWorkingHoursAndSlotsList,
  EntityRole,
  EntityType,
  Gender,
  Location,
  RegMode,
  Settings,
  StripeAccountType,
  Subscription,
  Term,
} from "./auth.types";
import { PaymentMethod } from "../payment/payment.types";

export type GetAccountResponse = {
  accountStatus: AccountStatus;
  addonUrl: string | null;
  address: Address;
  bizName: null | string;
  bizType: null | string;
  bizid: null | number;
  businessWorkingHoursAndSlotsList: null | BusinessWorkingHoursAndSlotsList;
  chargesEnabled: null | boolean;
  countryId: number;
  currency: Currency;
  currencySymbol: CurrencySymbol;
  custid: null | string;
  detailsSubmitted: null | boolean;
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
  merchantAllowed: null | boolean;
  merchantId: null | string;
  payoutsEnabled: null | boolean;
  pmethod: PaymentMethod[] | null;
  promoCode: null | string;
  qrLogo: null | string;
  qrid: number;
  referralCode: string;
  regMode: RegMode;
  setting: Settings[];
  showBiz: null | boolean;
  subscription: null | Subscription;
  tags: null | string;
  taxnbr: null | string;
  term: null | Term;
  userTimeZone: string;
  website: string | null;
  yob: string | null;
  stripeAccountType: StripeAccountType;
  isEmailVerified: boolean;
};

export type GenerateTokenResponse = {
  accessCode: string;
  accessCodeExpiry: number;
  refreshToken: string;
  email: string;
};

export type ResetPasswordResponse = {
  entity: "IDENTITY" | unknown;
  message: string;
  statusCode: null | unknown;
};

export type RefreshTokenResponse = GenerateTokenResponse;

export type SignInWithCredentialsResponse = null;

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

export type SendEmailVerificationCodeResponse = {
  entity: "TOKEN" | unknown;
  message: string;
  statusCode: null | unknown;
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

export type UpdateEmailResponse = {
  message: string;
};

export type GetGooglePermissionResponse = {
  message: string;
};
