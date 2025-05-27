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