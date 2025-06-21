import { useQuery } from "@tanstack/react-query";

import { onGetLocationOffers } from "@/actions/store.action";

export const useLocationOffers = ({
  locationIds,
}: {
  locationIds: number[];
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["locationOffers", locationIds],
    queryFn: async () => {
      if (locationIds.length === 0) return [];

      const response = await onGetLocationOffers({
        params: { locationIds },
      });

      if (!response.success || !response.data) {
        throw new Error(
          response.error?.details?.message || "Failed to fetch location offers"
        );
      }

      return response.data;
    },
    enabled: locationIds.length > 0, // Only run query when we have location IDs
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes (formerly cacheTime)
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return {
    locationOffers: data,
    isLoadingOffers: isLoading,
    locationOffersError: error,
  };
};
