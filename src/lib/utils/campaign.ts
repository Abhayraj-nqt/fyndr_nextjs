import { CAT_LIST_HOME, CATEGORY_ICON_MAP } from "@/constants";
import { Campaign, CampaignOffer } from "@/types/campaign/campaign.types";

// Home page filtered campaigns
const getPopularCampaigns = (campaigns: Campaign[]) => {
  const popularOffers = campaigns.filter(
    (i) =>
      i?.category?.name !== CAT_LIST_HOME[0]?.keyword &&
      i?.category?.name !== CAT_LIST_HOME[1]?.keyword &&
      i?.category?.name !== CAT_LIST_HOME[2]?.keyword
  );

  return popularOffers;
};

export const getFeaturedCampaigns = (campaigns: Campaign[]) => {
  const featured = false;

  const featuredCampaigns =
    campaigns
      ?.filter((item) => item.isFeatured && item.cmpnType !== "brochure")
      .slice(0, featured ? undefined : 12) || [];

  return featuredCampaigns;
};

export const getNearbyOffers = (campaigns: Campaign[]) => {
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

export const getNearbyEvents = (campaigns: Campaign[]) => {
  const popularOffers = getPopularCampaigns(campaigns);

  const popularEvents = popularOffers?.filter(
    (item) => item.cmpnType === "events" && !item?.isFeatured
  );
  return popularEvents;
};

export const getNearbyActivities = (campaigns: Campaign[]) => {
  const nearbyActivities = campaigns?.filter(
    (item) =>
      item.cmpnType !== "events" &&
      item.category.name === CAT_LIST_HOME[0].keyword &&
      !item.isFeatured &&
      item.cmpnType !== "brochure"
  );

  return nearbyActivities;
};

export const getNearbyDiningExperiences = (campaigns: Campaign[]) => {
  const nearbyDiningExperiences = campaigns?.filter(
    (item) =>
      item.cmpnType !== "events" &&
      item.category.name === CAT_LIST_HOME[1].keyword &&
      !item.isFeatured &&
      item.cmpnType !== "brochure"
  );

  return nearbyDiningExperiences;
};

export const getNearbyBeautyFinds = (campaigns: Campaign[]) => {
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
    CATEGORY_ICON_MAP.get(category.toLowerCase()) || "/icons/category/other.svg"
  );
};

export const getLowestOfferPrice = (offers: CampaignOffer[]) => {
  const lowestPrice = offers?.reduce(
    (prev, current) =>
      prev?.offerPrice < current?.offerPrice ? prev : current,
    offers[0] // Initial value
  );

  return lowestPrice;
};
