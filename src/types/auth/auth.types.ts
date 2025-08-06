export type RegMode = "classic" | "google" | "facebook" | "apple";
export type Gender = null | "M" | "F" | "OT" | "ND";
export type EntityRole =
  | "INDIVIDUAL_ADMIN"
  | "BIZ_ADMIN"
  | "SUPER_ADMIN"
  | "FYNDR_MANAGER"
  | "FYNDR_SUPPORT";
export type AccountStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED";
export type EntityType = "FYNDR" | "INDIVIDUAL" | "BUSINESS";
export type StripeAccountType = "STANDARD" | "EXPRESS" | "BOTH" | null;

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
  parentLocation: null | string;
  isCampaignBookingEnabled: boolean;
  isCatalogueBookingEnabled: boolean;
  locName: string;
  qrid: number;
  qrCode: string;
  addressLine1: string;
  addressLine2: string;
  catalogueName: null | string;
};

export type Term = {
  objid: null | number;
  title: null | string;
  status: null | string;
  terms: null | string;
  presentment: null | string;
  consentStorage: null | string;
  qrid: null | number;
  remark: null | string;
  startDt: null | string;
  endDt: null | string;
};

export type Subscription = {
  priceid: null;
  indvid: null;
  startDt: null | string;
  endDt: null | string;
  status: null | string;
  priceType: null | string;
  channel: null | string;
  transactionId: null | string;
  originalTransactionId: null | string;
};

export type BusinessWorkingHoursAndSlotsList = {
  id: null | number;
  locationId: null | number;
  weekDay: null | string;
  workingHourStartTime: null | unknown;
  workingHourEndTime: null | unknown;
  workingHoursAndSlotStatus: "ACTIVE" | "INACTIVE";
  slotDurationInMin: null | number;
  slotCapacity: null | number;
  createdDt: null | unknown;
  updatedDt: null | unknown;
  slotCapacityUpdatedDt: null | unknown;
  catalogueAppointmentType: "APPOINTMENT_PER_ITEM" | "APPOINTMENT_PER_CART";
  isCampaignBookingEnabled: boolean;
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
  valNum: null | number;
  valTxt: null | string;
  descr: null | string;
  userFor: string;
  objid: number;
  valJson: unknown[];
};
