type BusinessDirectory = {
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

  businessWorkingHours:
    | {
        Sunday?: string[];
        Monday?: string[];
        Tuesday?: string[];
        Wednesday?: string[];
        Thursday?: string[];
        Friday?: string[];
        Saturday?: string[];
      }
    | unknown;
  catImg: null | unknown;
  catalogueId: null | unknown;
  deliveryOptions: string;
  deliveryWithin: string;
  distance: number;
  liked: "yes" | "no";
  likes: null | unknown;
  workingHours: string;
};
