import { clsx, type ClassValue } from "clsx";
// import { MD5 } from "crypto-js";
import md5 from "react-native-md5";
import { twMerge } from "tailwind-merge";

import { CAT_LIST_HOME, CATEGORY_ICON } from "@/constants";
import { CampaignOfferProps, CampaignProps } from "@/types/campaign";
import { CurrencySymbol, DiscountType } from "@/types/global";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateString = (string: string) => {
  return string.slice(0, 60) + "...";
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

export const parseAddress = (addr: CampaignLocation) => {
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
  return parseFloat(number.toFixed(2));
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
      .slice(0, featured ? undefined : 15) || [];

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
