type Category = {
  objid: number;
  isActive: boolean;
  name: string;
};

type CampaignLocation = {
  addressLine1: string;
  addressLine2: string;
  campaignBookingEnabled: boolean;
  catalogueId: number;
  city: string;
  country: string;
  distance: number;
  lat: number;
  lng: number;
  locName: string;
  locType: string;
  locationId: number;
  objid: number;
  phone: string;
  postalCode: string;
  state: string;
  status: string | "active";
};

type CampaignOffer = {
  amount: number;
  campaignOfferStatus: string | "ACTIVE";
  couponCode: unknown;
  currency: string;
  currencySymbol: "$";
  discountType: "%";
  displayOrder: number;
  imageFilePath: unknown;
  isBookingEnabled: boolean;
  objid: number;
  offerLimit: unknown;
  offerPrice: number;
  offerSold: number;
  offerType: string | "offers";
  retailPrice: number;
  status: string | "active";
  stdTax: boolean;
  taxPercent: unknown;
  thumbnailFilePath: unknown;
  title: string;
  usageLimit: number;
  validityPeriod: unknown;
};

type Campaign = {
  biz: {
    addonUrl: unknown;
    addressLine1: string;
    addressLine2: string;
    bizEmail: string;
    bizName: string;
    bizType: string;
    bizid: number;
    city: string;
    country: string;
    lat: string;
    lng: string;
    mainLogo: string;
    merchantId: unknown;
    phone: string;
    postalCode: string;
    showBiz: boolean;
    state: string;
    website: string;
  };
  brochureFile: unknown;
  campaignLiked: boolean;
  campaignLocationCount: number | null;
  campaignStatus: string | "ACTIVE";
  category: Category;
  cmpnLocs: CampaignLocation[];
  cmpnOffers: CampaignOffer[];
  cmpnType: string | "offers";
  cmpnUrl: string;
  createdDt: string;
  deliveryChannel: string;
  description: string;
  endDt: string;
  featuredEndDt: unknown;
  featuredStartDt: unknown;
  finePrint: string;
  goal: string;
  images: {
    img_url: string;
    order: number;
    thumbnail_url: string;
  }[];
  indvCmpn: {
    bizId: number;
    cmpnId: number;
    indvId: number;
    isDeleted: boolean;
    likedCount: unknown;
    objid: number;
  };
  isFeatured: boolean;
  lastUpdatedBy: number;
  lastUpdatedDt: string;
  likedCount: number;
  objid: number;
  paymentSubscription: unknown;
  qrCode: string;
  startDt: string;
  status: string | "active";
  stdTax: unknown;
  tags: string;
  taxPercent: unknown;
  title: string;
  videos: unknown;
};

type BizDir = {
  addressLine1: string;
  addressLine2: string;
  bizName: string;
  bizid: number;
  businessWorkingHours: object;
  catImg: unknown | null;
  catalogueId: number | null;
  city: string;
  country: string;
  ctryCode: string;
  deliveryOptions: string;
  deliveryWithin: null | unknown;
  distance: number;
  lat: number;
  lng: number;
  liked: string;
  likes: null | unknown;
  mainLogo: string;
  objid: number;
  phone: string;
  postalCode: string;
  qrid: number;
  state: string;
  timeZone: null | unknown;
  website: string;
  workingHours: null | unknown;
};
