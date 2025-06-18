export type Location = {
  lat: number;
  lng: number;
  label?: "default" | "session" | "temporary";
};

// export enum LocationSource {
//   SESSION = "session",
//   TEMPORARY = "temporary",
//   DEFAULT = "default",
// }

// export type LocationState = {
//   current: Location;
//   source: LocationSource;
//   timestamp: number;
// };

export type LocationData = {
  country: string;
  parentLocation: null | unknown;
  isCampaignBookingEnabled?: boolean;
  isCatalogueBookingEnabled?: boolean;
  city: string;
  postalCode: string;
  locName: string;
  qrid: number;
  qrCode: string;
  objid: number;
  addressLine1: string;
  addressLine2: string;
  catalogueName: string;
  state: string;
  key?: number;
};
