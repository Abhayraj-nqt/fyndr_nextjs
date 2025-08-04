import { useQueryClient, useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { onLikeCampaign } from "@/actions/campaign.action";
import toast from "@/components/global/toast";
import ROUTES from "@/constants/routes";
import { LikeCampaignParams } from "@/types/campaign/campaign.params";
import { Campaign } from "@/types/campaign/campaign.types";

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
      const previousData = queryClient.getQueriesData({
        queryKey,
      });

      // Optimistically update all campaign queries
      queryClient.setQueriesData({ queryKey }, (old: any) => {
        if (!old) return old;

        if (isWishlistPage) {
          return {
            ...old,
            pages:
              old.pages?.map((page: any) => ({
                ...page,
                campaigns:
                  page.campaigns?.filter(
                    (campaign: Campaign) => campaign.objid !== variables.cmpnId
                  ) || [],
              })) ||
              old.campaigns?.filter(
                (campaign: Campaign) => campaign.objid !== variables.cmpnId
              ) ||
              old,
          };
        }

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
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
        };
      });

      return { previousData };
    },

    onSuccess: (data, variables) => {
      const queryKey = getQueryKey();
      // Update with actual server response data
      if (data.success && data.data) {
        const serverResponse = data.data;
        queryClient.setQueriesData({ queryKey }, (old: any) => {
          if (!old) return old;
          if (isWishlistPage) {
            return old;
          }
          return {
            ...old,
            pages: old.pages.map((page: any) => ({
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
