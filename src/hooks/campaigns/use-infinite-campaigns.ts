import { useInfiniteQuery } from "@tanstack/react-query";

import { onGetCampaigns } from "@/actions/campaign.action";
import { GetCampaignsParams } from "@/types/campaign/campaign.params";
import { GetCampaignsResponse } from "@/types/campaign/campaign.response";

export function useInfiniteCampaigns(
  params: GetCampaignsParams["params"],
  payload: GetCampaignsParams["payload"],
  initialData?: GetCampaignsResponse
) {
  return useInfiniteQuery({
    queryKey: ["campaigns", params, payload],
    queryFn: async ({ pageParam }) => {
      const response = await onGetCampaigns({
        params: {
          page: pageParam,
          pageSize: params.pageSize,
          orderBy: params.orderBy || "ASC",
          search: params.search,
        },
        payload,
      });

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
