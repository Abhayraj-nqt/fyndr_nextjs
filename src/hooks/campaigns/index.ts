/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines */
"use client";

import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { onGetCampaigns, onLikeCampaign } from "@/actions/campaign.action";
import toast from "@/components/global/toast";
import { CAT_LIST_HOME } from "@/constants";
import ROUTES from "@/constants/routes";
import { API_BASE_URL } from "@/environment";
import { _post } from "@/lib/handlers/fetch";
import { CampaignsResponse } from "@/types/api-response/campaign.response";
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
  page?: number;
  pageSize?: number;
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
  payload: CampaignQueryPayload,
  initialData?: CampaignsResponse
) {
  return useInfiniteQuery({
    queryKey: ["campaigns", params, payload],
    queryFn: async ({ pageParam }) => {
      const response = await onGetCampaigns(
        {
          page: pageParam,
          pageSize: params.pageSize,
          orderBy: params.orderBy || "ASC",
          search: params.search,
        },
        payload
      );

      if (!response.success || !response.data) {
        throw new Error(response.error?.message || "Failed to fetch campaigns");
      }

      return {
        ...response.data,
        currentPage: pageParam,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // If this is the last page, return undefined to stop fetching
      if (lastPage.last) {
        return undefined;
      }
      // Return the next page number (starts from 1, so next page is current length + 1)
      return allPages.length + 1;
    },
    // Use initial data if provided (from server-side rendering)
    ...(initialData && {
      initialData: {
        pages: [{ ...initialData, currentPage: 0 }],
        pageParams: [0],
      },
    }),
    // Optimizations
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}

export function useCampaignMapMarkers(
  params: CampaignQueryParams,
  payload: CampaignQueryPayload
) {
  // const queryKey = ["campaign-markers", payload];

  const queryKey = useMemo(() => {
    // Create a stable, serializable query key
    const stablePayload = {
      indvId: payload.indvId,
      distance: payload.distance,
      location: {
        lat: Number(payload.location.lat.toFixed(6)), // Normalize to 6 decimal places
        lng: Number(payload.location.lng.toFixed(6)),
      },
      campaignType: payload?.campaignType
        ? [...payload?.campaignType].sort()
        : [], // Sort for consistency
      categories: [...payload.categories].sort((a, b) => a - b), // Sort for consistency
      fetchById: payload.fetchById,
      fetchByGoal: payload.fetchByGoal,
      locQRId: payload.locQRId,
    };

    const stableParams = {
      orderBy: params.orderBy,
      search: params.search || null, // Normalize undefined to null
    };

    return ["campaign-markers", stableParams, stablePayload];
  }, [params, payload]);

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: () => onGetCampaigns(params, payload),
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on component mount if data exists and is fresh
    refetchOnReconnect: false, // Don't refetch on network reconnection
    retry: 2, // Retry failed requests 2 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  const campaigns = data?.data?.campaigns;

  return {
    campaigns,
    isLoading,
    isError,
    refetch,
  };
}

type LikeCampaignParams = {
  bizId: number;
  cmpnId: number;
  indvId: number;
  isDeleted: boolean;
  objid: number | null;
};

export function useOptimisticLike() {
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const isWishlistPage = pathname === ROUTES.MY_OFFERS;

  const getQueryKey = () => {
    if (isWishlistPage) {
      return ["my-offers"];
    }
    return ["campaigns"];
  };

  return useMutation({
    mutationFn: async (params: LikeCampaignParams) => {
      console.log({ likePayload: params });

      const response = await onLikeCampaign(params);

      console.log({ likeResponse: response });
      if (!response.success) {
        throw new Error("Failed to update like status");
      }
      return response;
    },

    onMutate: async (variables) => {
      const queryKey = getQueryKey();
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      // await queryClient.cancelQueries({ queryKey: ["campaigns"] });
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value for rollback
      const previousData = queryClient.getQueriesData({
        // queryKey: ["campaigns"],
        queryKey,
      });

      // Optimistically update all campaign queries
      // queryClient.setQueriesData({ queryKey: ["campaigns"] }, (old: any) => {
      queryClient.setQueriesData({ queryKey }, (old: any) => {
        if (!old) return old;

        if (isWishlistPage) {
          // if (variables.isDeleted) {
          return {
            ...old,
            pages:
              old.pages?.map((page: any) => ({
                ...page,
                campaigns:
                  page.campaigns?.filter(
                    (campaign: CampaignProps) =>
                      campaign.objid !== variables.cmpnId
                  ) || [],
              })) ||
              old.campaigns?.filter(
                (campaign: CampaignProps) => campaign.objid !== variables.cmpnId
              ) ||
              old,
          };
          // }
        }

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            campaigns: page.campaigns.map((campaign: CampaignProps) => {
              if (campaign.objid === variables.cmpnId) {
                // Calculate optimistic like count based on current state
                // const isCurrentlyLiked =
                //   campaign?.indvCmpn?.isDeleted === false &&
                //   campaign.indvCmpn?.objid;
                const newLikedCount = variables.isDeleted
                  ? Math.max(0, campaign.likedCount - 1) // If we're deleting the like (isDeleted: true), decrease count
                  : campaign.likedCount + 1; // If we're adding the like (isDeleted: false), increase count

                return {
                  ...campaign,
                  likedCount: newLikedCount,
                  indvCmpn: {
                    ...campaign.indvCmpn,
                    isDeleted: variables.isDeleted,
                    objid: variables.objid || campaign.indvCmpn?.objid || null,
                  },
                };
              }
              return campaign;
            }),
          })),
        };
      });

      return { previousData };
    },

    onSuccess: (data, variables) => {
      const queryKey = getQueryKey();
      // Update with actual server response data
      if (data.success && data.data) {
        const serverResponse = data.data;

        // queryClient.setQueriesData({ queryKey: ["campaigns"] }, (old: any) => {
        queryClient.setQueriesData({ queryKey }, (old: any) => {
          if (!old) return old;

          if (isWishlistPage) {
            return old;
          }

          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              campaigns: page.campaigns.map((campaign: CampaignProps) => {
                if (campaign.objid === variables.cmpnId) {
                  return {
                    ...campaign,
                    likedCount: serverResponse.likedCount, // Use server's like count
                    indvCmpn: {
                      ...campaign.indvCmpn,
                      isDeleted: serverResponse.isDeleted,
                      objid: serverResponse.objid, // Use server's objid
                    },
                  };
                }
                return campaign;
              }),
            })),
          };
        });
      }
    },

    onError: (_error, variables, context) => {
      // Rollback on error
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }

      toast.error({
        message: "Failed to update like status. Please try again.",
      });
    },
  });
}
