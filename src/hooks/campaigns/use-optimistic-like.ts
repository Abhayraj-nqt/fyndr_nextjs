import { useQueryClient, useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { onLikeCampaign } from "@/actions/campaign.action";
import toast from "@/components/global/toast";
import ROUTES from "@/constants/routes";
import { LikeCampaignParams } from "@/types/campaign/campaign.params";
import { LikeCampaignResponse } from "@/types/campaign/campaign.response";
import { Campaign } from "@/types/campaign/campaign.types";
import { ActionResponse } from "@/types/global"; // Adjust import path as needed

// Type for paginated campaign data
type CampaignPageData = {
  campaigns: Campaign[];
  // Add other page properties if they exist
  hasNextPage?: boolean;
  nextCursor?: string;
  [key: string]: unknown;
};

// Type for paginated query data structure
type PaginatedCampaignData = {
  pages: CampaignPageData[];
  pageParams?: unknown[];
};

// Type for wishlist/my-offers data structure
type MyOffersData = {
  campaigns?: Campaign[];
  pages?: CampaignPageData[];
  [key: string]: unknown;
};

// Union type for all possible query data structures
type QueryData = PaginatedCampaignData | MyOffersData | undefined;

// Type for mutation context
type MutationContext = {
  previousData: [readonly unknown[], QueryData][];
};

export function useOptimisticLike() {
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const isWishlistPage = pathname === ROUTES.MY_OFFERS;

  const getQueryKey = (): string[] => {
    if (isWishlistPage) {
      return ["my-offers"];
    }
    return ["campaigns"];
  };

  return useMutation<
    ActionResponse<LikeCampaignResponse>,
    Error,
    LikeCampaignParams["payload"],
    MutationContext
  >({
    mutationFn: async (payload: LikeCampaignParams["payload"]) => {
      const response = await onLikeCampaign({ payload });

      if (!response.success) {
        throw new Error("Failed to update like status");
      }
      return response;
    },

    onMutate: async (variables) => {
      const queryKey = getQueryKey();
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value for rollback
      const previousData = queryClient.getQueriesData<QueryData>({
        queryKey,
      });

      // Optimistically update all campaign queries
      queryClient.setQueriesData<QueryData>({ queryKey }, (old: QueryData) => {
        if (!old) return old;

        if (isWishlistPage) {
          const myOffersData = old as MyOffersData;
          return {
            ...myOffersData,
            pages: myOffersData.pages?.map((page: CampaignPageData) => ({
              ...page,
              campaigns:
                page.campaigns?.filter(
                  (campaign: Campaign) => campaign.objid !== variables.cmpnId
                ) || [],
            })),
            campaigns: myOffersData.campaigns?.filter(
              (campaign: Campaign) => campaign.objid !== variables.cmpnId
            ),
          } as MyOffersData;
        }

        const paginatedData = old as PaginatedCampaignData;
        return {
          ...paginatedData,
          pages: paginatedData.pages.map((page: CampaignPageData) => ({
            ...page,
            campaigns: page.campaigns.map((campaign: Campaign) => {
              if (campaign.objid === variables.cmpnId) {
                // Calculate optimistic like count based on current state
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
        } as PaginatedCampaignData;
      });

      return { previousData };
    },

    onSuccess: (data, variables) => {
      const queryKey = getQueryKey();
      // Update with actual server response data
      if (data.success && data.data) {
        const serverResponse = data.data;
        queryClient.setQueriesData<QueryData>(
          { queryKey },
          (old: QueryData) => {
            if (!old) return old;
            if (isWishlistPage) {
              return old;
            }

            const paginatedData = old as PaginatedCampaignData;
            return {
              ...paginatedData,
              pages: paginatedData.pages.map((page: CampaignPageData) => ({
                ...page,
                campaigns: page.campaigns.map((campaign: Campaign) => {
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
            } as PaginatedCampaignData;
          }
        );
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
