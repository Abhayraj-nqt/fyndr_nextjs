import { useQuery } from "@tanstack/react-query";

import { onGetLocationOfferReviews } from "@/actions/store.action";

export const useLocationOfferReviews = ({ bizIds }: { bizIds: number[] }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["locationOffers", bizIds],
    queryFn: async () => {
      if (bizIds.length === 0) return [];

      const response = await onGetLocationOfferReviews({
        payload: { bizId: bizIds },
      });

      if (!response.success || !response.data) {
        throw new Error(
          response.error?.details?.message || "Failed to fetch offer reviews"
        );
      }

      return response?.data?.bizCount || [];
    },
    enabled: bizIds.length > 0, // Only run query when we have location IDs
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes (formerly cacheTime)
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return {
    reviews: data || [],
    isLoadingReviews: isLoading,
    reviewsError: error,
    refetchReviews: refetch,
  };
};
