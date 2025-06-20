export type RegMode = "classic" | "google" | "facebook" | "apple";
export type Gender = null | "M" | "F" | "OT" | "ND";
export type EntityRole =
  | "BIZ_ADMIN"
  | "SUPER_ADMIN"
  | "FYNDR_SUPPORT"
  | "INDIVIDUAL_ADMIN";

export type EntityType = string;

export type RouteAccess = {
  path: string;
  roles: EntityRole[];
};

export type Address = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  ctryCode: string;
  lat: number;
  lng: number;
  phone: string;
  postalCode: string;
  state: string;
};

export type Location = {
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

export type BaseSignupPayload = {
  email: string;
  firstName: string;
  lastName: string;
  ctryCode: string;
  phone: string;
  country: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  isBusiness: boolean;
  referralCode: string | null;
  promoCode: string | null;
  lat: number;
  lng: number;
  pwd: string[] | null;
  regMode: RegMode;
  findUsId: number;
};

export type IndividualSignUpPayload = BaseSignupPayload & {
  yob: string | null;
  gender: Gender;
};

export type BusinessSignUpPayload = BaseSignupPayload & {
  bizInfo: {
    bizName: string;
    bizType: string;
    website: string;
    tags: string;
  };
  accountStatus?: string;
};

export type Settings = {
  name: string;
  valNum: null | unknown;
  valTxt: null | unknown;
  descr: null | unknown;
  userFor: string;
  objid: number;
  valJson: any[];
};
