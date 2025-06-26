export type BusinessWorkingHour = {
  Sunday?: string[];
  Monday?: string[];
  Tuesday?: string[];
  Wednesday?: string[];
  Thursday?: string[];
  Friday?: string[];
  Saturday?: string[];
};

export type LocationOffer = {
  locid: number;
  activeCampaignCount: number;
  cmpnImg: string;
  title: string;
  count: number;
  objid: number;
  cmpnQrCode: string;
};

export type BusinessDirectory = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  ctryCode: string;
  lat: number;
  lng: number;
  phone: string;
  postalCode: string;
  timeZone: string;

  bizName: string;
  bizid: number;
  website: string;
  mainLogo: string;
  objid: number;
  qrid: number;

  businessWorkingHours: BusinessWorkingHour;

  catImg: null | string;
  catalogueId: null | unknown;
  deliveryOptions: string;
  deliveryWithin: string;
  distance: number;
  liked: "yes" | "no";
  likes: null | unknown;
  workingHours: string;
};

export type EnhancedBusinessDirectory = BusinessDirectory & {
  bizDirLikes: number;
  locationOfferData: LocationOffer | null;
};
