/* eslint-disable @typescript-eslint/no-explicit-any */
export type CatalogImage = {
  img_url?: string;
  img?: string;
  index?: number;
};

export type CatalogueItem = {
  objid: number;
  currency: string;
  currencySymbol: string;
  name: string;
  images?: CatalogImage[];
  description?: string;
  catalogueItems?: any | null;
  locations?: any | null;
  url?: string;
};

export type catalogueListResponse = {
  last: boolean;
  catalogues: CatalogueItem[];
};

export type UpdateURLResponse = {
  message: string;
};

export type storeBiz = {
  bizid: number;
  bizName: string;
  website: string;
  mainLogo: string;
  addonUrl: string | null;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  bizType: string;
  lat: number;
  lng: number;
  showBiz: boolean;
  merchantId: string;
};

export type storeLocations = {
  objid: number;
  qrid: number;
  bizid: number;
  locName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  lat: number;
  lng: number;
  createdDt: string | null;
  updatedDt: string | null;
  ctryCode: string;
  status: string;
  locType: string | null;
  parentLocation: string | null;
  deliveryWithin: number | null;
  deliveryOptions: string;
  timeZone: string;
  workingHours: string;
  distance: number | null;
  catalogueId: number | null;
  biz: any;
  workingHoursAndSlots: any;
};

export type fetchLocationResponse = {
  biz: storeBiz;
  locations: storeLocations[];
};

export type images = {
  img_url: string;
  index: number;
  extn?: string;
  imgUri?: string;
};

export type StoreCategory = {
  objid: number;
  images: images[];
  name: string;
  description: string;
  createDt: string;
  updateDt: string;
};

export type StoreCategoryResponse = {
  categories: StoreCategory[];
  last: boolean;
};

export type StoreItem = {
  objid: number;
  images: images[];
  sku: string;
  name: string;
  unit: string;
  description: string;
  stdTax: boolean;
  taxPercent: number;
  createDt: string;
  updateDt: string;
};

export type StoreItemResponse = {
  items: StoreItem[];
  last: boolean;
};

export type StoreModifier = {
  objid: number;
  images: images[];
  modType: string;
  modName: string;
  description: string;
  createDt: string;
  updateDt: string;
};

export type StoreModifierResponse = {
  modifiers: StoreModifier[];
  last: boolean;
};

export type StoreModifierDelete = {
  success: boolean;
};

export type UploadedImageData = {
  img: string;
  index: number;
  extn: string;
  imgUri: string;
};
