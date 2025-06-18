"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { onGetStores } from "@/actions/store.action";
import { Coordinates } from "@/types/global";

type Params = {
  search?: string;
  page: number;
  pageSize: number;
};
type Payload = {
  indvId: number | null;
  distance: number;
  isCategory: boolean;
  location: Coordinates;
};

export function useBusinessDirectoryMap({
  params,
  payload,
}: {
  params: Params;
  payload: Payload;
}) {
  const queryKey = useMemo(() => {
    const stablePayload: Payload = {
      indvId: payload.indvId,
      distance: payload.distance,
      location: {
        lat: Number(payload.location.lat.toFixed(6)),
        lng: Number(payload.location.lng.toFixed(6)),
      },
      isCategory: payload.isCategory,
    };

    const stableParams: Params = {
      search: params.search,
      page: params.page,
      pageSize: params.pageSize,
    };

    return ["business-directory-map", stableParams, stablePayload];
  }, [params, payload]);

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: () => onGetStores(params, payload),
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on component mount if data exists and is fresh
    refetchOnReconnect: false, // Don't refetch on network reconnection
    retry: 2, // Retry failed requests 2 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  const bizDir = data?.data?.bizdir || [];

  return {
    bizDir,
    isLoading,
    isError,
    refetch,
  };
}
