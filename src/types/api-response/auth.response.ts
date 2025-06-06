/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AddressProps,
  Currency,
  CurrencySymbol,
  RegModeProps,
} from "../global";

type GenderProps = null | "M" | "F" | "ND" | "OT";

type SettingProps = {
  name: string;
  valNum: null | unknown;
  valTxt: null | unknown;
  descr: null | unknown;
  userFor: string;
  objid: number;
  valJson: any[];
};

type LocationProps = {
  objid: number;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  parentLocation: null | unknown;
  isCampaignBookingEnabled: boolean;
  isCatalogueBookingEnabled: boolean;
  locName: string;
  qrid: number;
  qrCode: string;
  addressLine1: string;
  addressLine2: string;
  catalogueName: null | unknown;
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
  gender: GenderProps;
  googleCalendarPermissionGranted: boolean;
  identity: string;
  indvid: number;
  isBusiness: boolean;
  isSubscribedToFyndrPromoEmails: boolean;
  locations: null | LocationProps[];
  mainLogo: null | string;
  merchantAllowed: boolean;
  merchantId: null | unknown;
  payoutsEnabled: null | unknown;
  pmethod: PaymentMethod[] | null;
  promoCode: null | unknown;
  qrLogo: null | unknown;
  qrid: number | unknown;
  referralCode: string | unknown;
  regMode: RegModeProps;
  setting: SettingProps[];
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

export type RefreshTokenResponse = {
  accessCode: string;
  accessCodeExpiry: number;
  refreshToken: string;
  email: string;
};

export type GenerateTokenResponse = {
  accessCode: string;
  accessCodeExpiry: number;
  refreshToken: string;
  email: string;
};
