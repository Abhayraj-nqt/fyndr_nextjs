import { Currency, CurrencySymbol, DiscountType, OfferStatus } from "../global";

type CampaignTypeProps = "offers" | "events" | "coupons" | "brochure";
type CampaignStatusProps = "ACTIVE";
type CampaignStatusProps2 = "active" | "inactive";

type CampaignImageProps = {
  img_url: string;
  thumbnail_url: string;
  order: number;
};

type CampaignCategoryProps = {
  categoryId: number;
  isActive: boolean;
  name: string;
};

type CampaignIndvProps = {
  indvId: number;
  objid: number;
  cmpnId: number;
  bizId: number;
  isDeleted: boolean;
  likedCount: null | number;
};

type CampaignBizProps = {
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

type CampaignOfferProps = {
  objid: number;
  amount: number;
  isBookingEnabled: boolean;
  isVoucher: boolean;
  stdTax: boolean;

  offerLimit: number | null;
  offerPrice: number;
  offerSold: number;
  offerType: "offers" | "coupons" | "events";
  repurchasePeriod: number;
  retailPrice: number;
  usageLimit: number;
  taxPercent: number | null;

  title: string;
  status: OfferStatus;
  voucherFileName: string | null;
  validityPeriod: string;
  campaignOfferStatus: string;
  couponCode: string | null;
  currency: Currency;
  currencySymbol: CurrencySymbol;
  discountType: DiscountType;
  displayOrder: number;
  imageFilePath: string | null;
  thumbnailFilePath: string | null;
};

type CampaignLocationProps = {
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
  status: string;
};

type PaymentSubscriptionProps = {
  id: number;
  defaultPaymentId: string;
  createdDt: string;
  updatedDt: string;
  status: "ACTIVE" | "INACTIVE" | string;
  lastInvoiceId: number;
  updatedDuration: number;
};

export type CampaignProps = {
  qrCode: string;
  startDt: string;
  endDt: string;
  createdDt: string;
  lastUpdatedDt: string;
  lastUpdatedBy: number;

  objid: number;
  title: string;
  description: string;
  cmpnUrl: string;
  finePrint: string;
  brochureFile: null | unknown;
  goal: string;
  deliveryChannel: string;
  tags: string;

  isFeatured: boolean;
  featuredStartDt: null | string;
  featuredEndDt: null | string;

  stdTax: null | unknown;
  taxPercent: null | number;

  images: CampaignImageProps[] | null;
  cmpnLocs: CampaignLocationProps[];
  cmpnOffers: CampaignOfferProps[];
  category: CampaignCategoryProps;
  indvCmpn: CampaignIndvProps;
  cmpnType: CampaignTypeProps;
  campaignStatus: CampaignStatusProps;
  status: CampaignStatusProps2;
  biz: CampaignBizProps;

  videos: null | unknown;
  campaignLocationCount: null | number;
  paymentSubscription: PaymentSubscriptionProps | null;

  likedCount: number;
  campaignLiked: boolean;
};
