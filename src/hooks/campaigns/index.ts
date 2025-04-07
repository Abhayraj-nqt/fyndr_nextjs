import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { CAT_LIST_HOME } from "@/constants";
import { API_BASE_URL } from "@/environment";
import { _post } from "@/lib/handlers/fetch";
import {
  CampaignProps,
  CampaignQueryParams,
  CampaignQueryPayload,
  CampaignsResponseProps,
} from "@/types/campaign";
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

// export const useGetCampaignsInfinite = (
//   params: {
//     search?: string;
//     page: number;
//     pageSize: number;
//     orderBy?: string;
//   },
//   payload: {
//     indvId: number | null;
//     locQRId: number | null;
//     distance: number;
//     location: Coordinates;
//     categories: number[];
//     fetchById: string;
//     fetchByGoal: FetchGoalProps;
//     campaignType: CampaignTypeProps[];
//   }
// ) => {
//   const {
//     data,
//     isLoading,
//     isError,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useInfiniteQuery({
//     queryKey: ["campaigns"],
//     queryFn: () => fetch(""),
//     initialPageParam: undefined as number | undefined,
//     getNextPageParam: (lastPage) => lastPage.text,
//   });
// };

export const useGetCampaignsInfinite = (
  params: CampaignQueryParams,
  payload: CampaignQueryPayload
) => {
  const fetchCampaigns = async ({
    pageParam = params.page,
  }): Promise<CampaignsResponseProps> => {
    // Build query parameters string
    const queryParams = new URLSearchParams();

    // Add all params to query string
    if (params.search) queryParams.append("search", params.search);
    queryParams.append("page", pageParam.toString());
    queryParams.append("pageSize", params.pageSize.toString());
    if (params.orderBy) queryParams.append("orderBy", params.orderBy);

    // Create a copy of the payload with the updated page if needed
    const currentPagePayload = {
      ...payload,
      // You can add any page-specific modifications to the payload here if needed
    };

    const response = await _post<CampaignsResponseProps>(
      `/api/campaigns?${queryParams.toString()}`,
      currentPagePayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const endpoint = `${API_BASE_URL}/campaign/v2/public/search?pgStart=${params.page}&pgSize=${params.pageSize}`;

    const {} = await _post();

    return response.data;
  };

  return useInfiniteQuery({
    // Include both params and payload in the queryKey for proper cache invalidation
    queryKey: [
      "campaigns",
      // Include specific params that affect results
      params.search,
      params.pageSize,
      params.orderBy,
      // Include critical payload fields that affect results
      payload.indvId,
      payload.locQRId,
      payload.distance,
      payload.location,
      payload.categories,
      payload.fetchById,
      payload.fetchByGoal,
      payload.campaignType,
    ],
    queryFn: fetchCampaigns,
    getNextPageParam: (lastPage, allPages) => {
      // Return undefined if we've reached the last page
      if (lastPage.last) return undefined;

      // Calculate the next page number
      return params.page + allPages.length;
    },
    // Refetch when window regains focus - disabled to prevent unnecessary fetches
    refetchOnWindowFocus: false,
    // Keep data fresh for 5 minutes
    staleTime: 5 * 60 * 1000,
    // Cache data for 10 minutes
    gcTime: 10 * 60 * 1000,
    // Retry failed requests 3 times before erroring
    retry: 3,
  });
};
