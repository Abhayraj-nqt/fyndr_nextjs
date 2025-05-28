import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import md5 from "react-native-md5";
import { twMerge } from "tailwind-merge";

import { CAT_LIST_HOME, CATEGORY_ICON } from "@/constants";
import { Address, Biz, fetchInvoice, InvoiceOfferDetail, Item, Offer } from "@/types/api-response/transaction.response";
import { CampaignOfferProps, CampaignProps } from "@/types/campaign";
import { CurrencySymbol, DiscountType } from "@/types/global";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateString = (string: string, charCount: number = 60) => {
  return string.slice(0, charCount) + "...";
};

export const encryptPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const pwd = md5.str_md5(email.toLowerCase().substring(0, 5) + password);
  return pwd;
};

export const parseAddress = (addr: CampaignLocation | Biz) => {
  return addr
    ? `${addr?.addressLine1 !== null ? addr?.addressLine1 : ""}${
        addr?.addressLine2 !== null &&
        addr?.addressLine2 !== undefined &&
        addr?.addressLine2 !== ""
          ? ", " + addr?.addressLine2
          : ""
      }${addr?.city !== null ? ", " + addr?.city + ", " : ""} ${addr?.state} ${
        addr?.postalCode
      }`
    : "";
};

export const getLowestPriceOffer = (offers: CampaignOfferProps[]) => {
  const lowestPrice = offers?.reduce(
    (prev, current) =>
      prev?.offerPrice < current?.offerPrice ? prev : current,
    offers[0] // Initial value
  );

  return lowestPrice;
};

export const toTwoDecimalPlaces = (number: number) => {
  return number.toFixed(2);
};

export const parseDiscount = (
  amount: number,
  discountType: DiscountType,
  currencySymbol: CurrencySymbol
) => {
  return discountType === "%"
    ? `${amount}% OFF`
    : `${currencySymbol} ${toTwoDecimalPlaces(amount)} OFF`;
};

export const getRemaining = (total: number, sold: number) => {
  return total - sold;
};

// Home page filtered campaigns
const getPopularCampaigns = (campaigns: CampaignProps[]) => {
  const popularOffers = campaigns.filter(
    (i) =>
      i?.category?.name !== CAT_LIST_HOME[0]?.keyword &&
      i?.category?.name !== CAT_LIST_HOME[1]?.keyword &&
      i?.category?.name !== CAT_LIST_HOME[2]?.keyword
  );

  return popularOffers;
};

export const getFeaturedCampaigns = (campaigns: CampaignProps[]) => {
  const featured = false;

  const featuredCampaigns =
    campaigns
      ?.filter((item) => item.isFeatured && item.cmpnType !== "brochure")
      .slice(0, featured ? undefined : 12) || [];

  return featuredCampaigns;
};

export const getNearbyOffers = (campaigns: CampaignProps[]) => {
  const popularOffers = getPopularCampaigns(campaigns);

  const catOneData = campaigns
    .filter(
      (i) =>
        i.cmpnType !== "events" &&
        i.category.name === CAT_LIST_HOME[0].keyword &&
        !i.isFeatured &&
        i.cmpnType !== "brochure"
    )
    .slice(12);
  const catTwoData = campaigns
    .filter(
      (i) =>
        i.cmpnType !== "events" &&
        i.category.name === CAT_LIST_HOME[1].keyword &&
        !i.isFeatured &&
        i.cmpnType !== "brochure"
    )
    .slice(12);
  const catThreeData = campaigns
    .filter(
      (i) =>
        i.cmpnType !== "events" &&
        i.category.name === CAT_LIST_HOME[2].keyword &&
        !i.isFeatured &&
        i.cmpnType !== "brochure"
    )
    .slice(12);

  const nearbyOffersAll = [
    ...popularOffers,
    ...catOneData,
    ...catTwoData,
    ...catThreeData,
  ];

  const imglistValue = 32;

  const nearbyOffers =
    nearbyOffersAll
      ?.filter(
        (item) =>
          item.cmpnType !== "events" &&
          !item.isFeatured &&
          item.cmpnType !== "brochure"
      )
      ?.slice(0, imglistValue)
      .sort((a, b) => {
        // Safely access the distance property, defaulting to Infinity if not present
        const distanceA = a.cmpnLocs[0]?.distance ?? Infinity;
        const distanceB = b.cmpnLocs[0]?.distance ?? Infinity;

        return distanceA - distanceB;
      }) || [];

  return nearbyOffers;
};

export const getNearbyEvents = (campaigns: CampaignProps[]) => {
  const popularOffers = getPopularCampaigns(campaigns);

  const popularEvents = popularOffers?.filter(
    (item) => item.cmpnType === "events" && !item?.isFeatured
  );
  return popularEvents;
};

export const getNearbyActivities = (campaigns: CampaignProps[]) => {
  const nearbyActivities = campaigns?.filter(
    (item) =>
      item.cmpnType !== "events" &&
      item.category.name === CAT_LIST_HOME[0].keyword &&
      !item.isFeatured &&
      item.cmpnType !== "brochure"
  );

  return nearbyActivities;
};

export const getNearbyDiningExperiences = (campaigns: CampaignProps[]) => {
  const nearbyDiningExperiences = campaigns?.filter(
    (item) =>
      item.cmpnType !== "events" &&
      item.category.name === CAT_LIST_HOME[1].keyword &&
      !item.isFeatured &&
      item.cmpnType !== "brochure"
  );

  return nearbyDiningExperiences;
};

export const getNearbyBeautyFinds = (campaigns: CampaignProps[]) => {
  const nearbyBeautyFinds = campaigns?.filter(
    (item) =>
      item.cmpnType !== "events" &&
      item.category.name === CAT_LIST_HOME[2].keyword &&
      !item.isFeatured &&
      item.cmpnType !== "brochure"
  );

  return nearbyBeautyFinds;
};

export const getCategoryIcon = (category: string) => {
  return (
    CATEGORY_ICON.get(category.toLowerCase()) || "/icons/category/other.svg"
  );
};

export const slugify = (path: string): string => {
  const parts = path.split("/");
  const slugifiedParts = parts.map((part) => {
    if (part === "") return part;
    return _slugify(part);
  });
  return slugifiedParts.join("/");
};

export const validatePostalAddress = async (value: string, country: string) => {
  const pattern = new RegExp("^" + postalPattern[country] + "$");

  if (pattern.test(value)) return true;
  else return false;
};

//* It will only used for internal functions - No need to export ----------------------------------------------------------

const _slugify = (str: string | number): string => {
  return (
    str
      .toString()
      .normalize("NFD") // Normalize to decomposed form for handling accents
      .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      // eslint-disable-next-line no-useless-escape
      .replace(/[^\w\-\/]+/g, "") // Remove all non-word chars (except hyphens and slashes)
      .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/-+\//g, "/") // Clean up hyphens before slashes
      .replace(/\/-+/g, "/") // Clean up hyphens after slashes
      .replace(/^-+/, "") // Remove leading hyphens
      .replace(/-+$/, "")
  ); // Remove trailing hyphens
};

export const postalPattern: Record<string, string> = {
  GB: "GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(\\d[\\dA-Z]?[ ]?\\d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?\\d{1:4}",
  JE: "JE\\d[\\dA-Z]?[ ]?\\d[ABD-HJLN-UW-Z]{2}",
  GG: "GY\\d[\\dA-Z]?[ ]?\\d[ABD-HJLN-UW-Z]{2}",
  IM: "IM\\d[\\dA-Z]?[ ]?\\d[ABD-HJLN-UW-Z]{2}",
  US: "\\d{5}([ \\-]\\d{4})?",
  CA: "[ABCEGHJKLMNPRSTVXY]\\d[ABCEGHJ-NPRSTV-Z][ ]?\\d[ABCEGHJ-NPRSTV-Z]\\d",
  DE: "\\d{5}",
  JP: "\\d{3}-\\d{4}",
  FR: "\\d{2}[ ]?\\d{3}",
  AU: "\\d{4}",
  IT: "\\d{5}",
  CH: "\\d{4}",
  AT: "\\d{4}",
  ES: "\\d{5}",
  NL: "\\d{4}[ ]?[A-Z]{2}",
  BE: "\\d{4}",
  DK: "\\d{4}",
  SE: "\\d{3}[ ]?\\d{2}",
  NO: "\\d{4}",
  BR: "\\d{5}[\\-]?\\d{3}",
  PT: "\\d{4}([\\-]\\d{3})?",
  FI: "\\d{5}",
  AX: "22\\d{3}",
  KR: "\\d{3}[\\-]\\d{3}",
  CN: "\\d{6}",
  TW: "\\d{3}(\\d{2})?",
  SG: "\\d{6}",
  DZ: "\\d{5}",
  AD: "AD\\d{3}",
  AR: "([A-HJ-NP-Z])?\\d{4}([A-Z]{3})?",
  AM: "(37)?\\d{4}",
  AZ: "\\d{4}",
  BH: "((1[0-2]|[2-9])\\d{2})?",
  BD: "\\d{4}",
  BB: "(BB\\d{5})?",
  BY: "\\d{6}",
  BM: "[A-Z]{2}[ ]?[A-Z0-9]{2}",
  BA: "\\d{5}",
  IO: "BBND 1ZZ",
  BN: "[A-Z]{2}[ ]?\\d{4}",
  BG: "\\d{4}",
  KH: "\\d{5}",
  CV: "\\d{4}",
  CL: "\\d{7}",
  CR: "\\d{4:5}|\\d{3}-\\d{4}",
  HR: "\\d{5}",
  CY: "\\d{4}",
  CZ: "\\d{3}[ ]?\\d{2}",
  DO: "\\d{5}",
  EC: "([A-Z]\\d{4}[A-Z]|(?:[A-Z]{2})?\\d{6})?",
  EG: "\\d{5}",
  EE: "\\d{5}",
  FO: "\\d{3}",
  GE: "\\d{4}",
  GR: "\\d{3}[ ]?\\d{2}",
  GL: "39\\d{2}",
  GT: "\\d{5}",
  HT: "\\d{4}",
  HN: "(?:\\d{5})?",
  HU: "\\d{4}",
  IS: "\\d{3}",
  IN: "\\d{6}",
  ID: "\\d{5}",
  IL: "\\d{5}",
  JO: "\\d{5}",
  KZ: "\\d{6}",
  KE: "\\d{5}",
  KW: "\\d{5}",
  LA: "\\d{5}",
  LV: "\\d{4}",
  LB: "(\\d{4}([ ]?\\d{4})?)?",
  LI: "(948[5-9])|(949[0-7])",
  LT: "\\d{5}",
  LU: "\\d{4}",
  MK: "\\d{4}",
  MY: "\\d{5}",
  MV: "\\d{5}",
  MT: "[A-Z]{3}[ ]?\\d{2:4}",
  MU: "(\\d{3}[A-Z]{2}\\d{3})?",
  MX: "\\d{5}",
  MD: "\\d{4}",
  MC: "980\\d{2}",
  MA: "\\d{5}",
  NP: "\\d{5}",
  NZ: "\\d{4}",
  NI: "((\\d{4}-)?\\d{3}-\\d{3}(-\\d{1})?)?",
  NG: "(\\d{6})?",
  OM: "(PC )?\\d{3}",
  PK: "\\d{5}",
  PY: "\\d{4}",
  PH: "\\d{4}",
  PL: "\\d{2}-\\d{3}",
  PR: "00[679]\\d{2}([ \\-]\\d{4})?",
  RO: "\\d{6}",
  RU: "\\d{6}",
  SM: "4789\\d",
  SA: "\\d{5}",
  SN: "\\d{5}",
  SK: "\\d{3}[ ]?\\d{2}",
  SI: "\\d{4}",
  ZA: "\\d{4}",
  LK: "\\d{5}",
  TJ: "\\d{6}",
  TH: "\\d{5}",
  TN: "\\d{4}",
  TR: "\\d{5}",
  TM: "\\d{6}",
  UA: "\\d{5}",
  UY: "\\d{5}",
  UZ: "\\d{6}",
  VA: "00120",
  VE: "\\d{4}",
  ZM: "\\d{5}",
  AS: "96799",
  CC: "6799",
  CK: "\\d{4}",
  RS: "\\d{6}",
  ME: "8\\d{4}",
  CS: "\\d{5}",
  YU: "\\d{5}",
  CX: "6798",
  ET: "\\d{4}",
  FK: "FIQQ 1ZZ",
  NF: "2899",
  FM: "(9694[1-4])([ \\-]\\d{4})?",
  GF: "9[78]3\\d{2}",
  GN: "\\d{3}",
  GP: "9[78][01]\\d{2}",
  GS: "SIQQ 1ZZ",
  GU: "969[123]\\d([ \\-]\\d{4})?",
  GW: "\\d{4}",
  HM: "\\d{4}",
  IQ: "\\d{5}",
  KG: "\\d{6}",
  LR: "\\d{4}",
  LS: "\\d{3}",
  MG: "\\d{3}",
  MH: "969[67]\\d([ \\-]\\d{4})?",
  MN: "\\d{6}",
  MP: "9695[012]([ \\-]\\d{4})?",
  MQ: "9[78]2\\d{2}",
  NC: "988\\d{2}",
  NE: "\\d{4}",
  VI: "008(([0-4]\\d)|(5[01]))([ \\-]\\d{4})?",
  PF: "987\\d{2}",
  PG: "\\d{3}",
  PM: "9[78]5\\d{2}",
  PN: "PCRN 1ZZ",
  PW: "96940",
  RE: "9[78]4\\d{2}",
  SH: "(ASCN|STHL) 1ZZ",
  SJ: "\\d{4}",
  SO: "\\d{5}",
  SZ: "[HLMS]\\d{3}",
  TC: "TKCA 1ZZ",
  WF: "986\\d{2}",
  XK: "\\d{5}",
  YT: "976\\d{2}",
};

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const parseAddressInvoice = (addr: Address) => {
  return addr
    ? `${addr?.addressLine1 !== null ? addr?.addressLine1 : ""}${
        addr?.addressLine2 !== null &&
        addr?.addressLine2 !== undefined &&
        addr?.addressLine2 !== ""
          ? ", " + addr?.addressLine2
          : ""
      }${addr?.city !== null ? ", " + addr?.city + ", " : ""} ${addr?.state} ${
        addr?.postalCode
      }`
    : "";
};

export type ChannelOffer =
  | "offers"
  | "offer_appointment"
  | "events"
  | "custom"
  | "catalog"
  | "catalog_appointment"
  | "cmpn_promo"
  | "promo";

export const getChannelName = (channel: ChannelOffer): string => {
  switch (channel) {
    case "offers":
    case "offer_appointment":
      return "Offer";
    case "events":
      return "Event";
    case "custom":
      return "Custom";
    case "catalog":
    case "catalog_appointment":
      return "Catalog";
    case "cmpn_promo":
    case "promo":
      return "Campaign";
    default:
      return "Unknown";
  }
};

export type Status = "unused" | "redeemed" | "partially-redeemed";

export const getStatusColor = (status: Status): string => {
  switch (status) {
    case "unused":
      return "#32871E";
    case "redeemed":
      return "#FFC700";
    case "partially-redeemed":
      return "#257CDB";
    default:
      return "Unknown";
  }
};

export const statusList = [
  { value: "redeemed", display: "Fully Redeemed" },
  { value: "partially-redeemed", display: "Partially Redeemed" },
];

export const getDisplayStatus = (status: Status): string => {
  try {
    if (status === "unused") return "Unused";
    return statusList.find((row) => row.value === status)?.display || "";
  } catch {
    return "";
  }
};

export const getFormattedDtNew = (tm: string, timeZone: string): string => {
  return dayjs.tz(tm, timeZone).utc().format("MMMM DD, YYYY");
};




export const getchannelBought = (channel: ChannelOffer): string => {
  switch (channel) {
    case "offers":
    case "offer_appointment":
      return "Offers";
    case "events":
      return "Events";
    case "custom":
      return "Custom";
    case "catalog":
    case "catalog_appointment":
      return "Items";
    case "cmpn_promo":
    case "promo":
      return "Campaign";
    default:
      return "Unknown";
  }
};


export const sumQuantities = (
  items: (Item | Offer)[] | undefined | null
): number => {

  console.log("items", items);
 if (!items || !Array.isArray(items)) {
    return 0;
  }


  let sum = 0;

  items.forEach((item) => {
    sum += (item as Item).details?.qty ?? (item as InvoiceOfferDetail).qty ?? 0;
  });

  return sum;
};


export const getTotal = (rec:  fetchInvoice ): string => {
  return (
    Number(rec.baseAmount) +
    Number(!isNaN(Number(rec.taxAmount)) ? rec.taxAmount : 0) +
    (rec.tipAmount ? Number(rec.tipAmount) : 0) -
    Number(rec.discountAmount || 0)
  ).toFixed(2);
};

export  const getTruncatedTitle = (title : string, limit = 50) => {
    if (!title) return "";
    return title.length > limit ? `${title.slice(0, limit)}...` : title;
  };