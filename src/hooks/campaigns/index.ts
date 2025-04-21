import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { CAT_LIST_HOME } from "@/constants";
import { API_BASE_URL } from "@/environment";
import { onGetCampaigns } from "@/lib/actions/campaign.action";
import { _post } from "@/lib/handlers/fetch";
import { CampaignProps } from "@/types/campaign";
import { Coordinates } from "@/types/global";

export const useGetCampaigns = (
  params: {
    search?: string;
    page: number;
    pageSize: number;
    orderBy?: string;
  },
  payload: {
    indvId: number;
    distance: number;
    location: Coordinates;
    categories: string[];
    fetchById: string;
    fetchByGoal: string;
  }
) => {
  type Response = {
    campaigns: CampaignProps[];
    count: number;
    last: boolean;
    resultFromCampaignTag: boolean;
    resultFromTextExactMatch: null | boolean;
  };
  const endpoint = `${API_BASE_URL}/campaign/v2/public/search?pgStart=${params.page}&pgSize=${params.pageSize}`;
  const { data, isLoading } = useQuery({
    queryKey: ["home-page-cmpns"],
    queryFn: () =>
      _post<Response>(endpoint, payload, {
        timeout: 10000,
      }),
  });

  const campaigns = data?.data?.campaigns || [];

  const onGetFeaturedCampaigns = () => {
    const featured = false;

    const featuredCampaigns =
      campaigns
        ?.filter((item) => item.isFeatured && item.cmpnType !== "brochure")
        .slice(0, featured ? undefined : 15) || [];

    return featuredCampaigns;
  };

  const onGetNearbyOffers = () => {
    const popularOffers = campaigns.filter(
      (i) =>
        i?.category?.name !== CAT_LIST_HOME[0]?.keyword &&
        i?.category?.name !== CAT_LIST_HOME[1]?.keyword &&
        i?.category?.name !== CAT_LIST_HOME[2]?.keyword
    );

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
          const distanceA = a.cmpnLocs[0]?.distance ?? Infinity;
          const distanceB = b.cmpnLocs[0]?.distance ?? Infinity;

          return distanceA - distanceB;
        }) || [];

    return nearbyOffers;
  };

  const onGetNearbyEvents = () => {};

  const onGetNearbyActivities = () => {};

  const onGetNearbyDiningExperiences = () => {};

  const onGetNearbyBeautyCampaigns = () => {};

  console.log(data);

  return {
    isLoading,
    onGetFeaturedCampaigns,
    onGetNearbyActivities,
    onGetNearbyEvents,
    onGetNearbyOffers,
    onGetNearbyBeautyCampaigns,
    onGetNearbyDiningExperiences,
  };
};

type CampaignQueryParams = {
  search?: string;
  page: number;
  pageSize: number;
  orderBy?: "ASC" | "DESC";
};
type CampaignQueryPayload = {
  indvId: number | null;
  distance: number;
  location: Coordinates;
  categories: number[];
  campaignType?: string[];
  fetchById: string;
  fetchByGoal: string;
  locQRId?: null;
};

export function useInfiniteCampaigns(
  params: CampaignQueryParams,
  payload: CampaignQueryPayload
) {
  return useInfiniteQuery({
    queryKey: ["campaigns", params, payload],
    queryFn: async ({ pageParam = params.page }) => {
      const response = await onGetCampaigns(
        {
          page: pageParam,
          pageSize: params.pageSize,
          orderBy: params.orderBy || "ASC",
        },
        payload
      );

      if (!response.success || !response.data) {
        throw new Error(response.error?.message || "Failed to fetch campaigns");
      }

      return {
        ...response.data,
        pageParam,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageParam + 1;
    },

    // Reset the query cache when the query params change
    // refetchOnMount: true,
  });
}
