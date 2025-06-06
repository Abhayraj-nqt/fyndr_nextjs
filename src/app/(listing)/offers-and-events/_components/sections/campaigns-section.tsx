"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import InfiniteScrollContainer from "@/components/global/infinite-scroll-container";
import { useInfiniteCampaigns } from "@/hooks/campaigns";
import { Coordinates } from "@/types/global";

import CampaignCard from "../campaign-card";

type Props = {
  location: Coordinates;
  indvId: string | number | null;
  dealTypes: string[];
  categories: number[];
  distance: number;
  query?: string;
  mode: string;
  order: "asc" | "desc";
};

const CampaignsSection = ({
  location,
  dealTypes,
  categories = [],
  distance = 50,
  indvId,
  query,
  mode,
  order = "asc",
}: Props) => {
  const params = {
    search: query,
    page: 0,
    pageSize: 20,
    orderBy: order.toLocaleUpperCase() as "ASC" | "DESC",
  };

  const payload = {
    indvId: indvId ? Number(indvId) : null,
    distance,
    location,
    campaignType: dealTypes,
    categories,
    fetchById: "none",
    fetchByGoal: mode === "offline" ? "INSTORE" : "ONLINE",
    locQRId: null,
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
  } = useInfiniteCampaigns(params, payload);

  // Refetch when filters change
  useEffect(() => {
    refetch();
  }, [dealTypes, categories, distance, location, indvId, refetch, mode]);

  // Flatten campaign data from all pages
  // const campaigns = data?.pages.flatMap((page) => page.campaigns) || [];
  // Add this helper to track unique IDs
  const uniqueIds = new Set();
  const campaigns =
    data?.pages.flatMap((page) => {
      // Filter out duplicates before adding to the list
      return page.campaigns.filter((campaign) => {
        if (uniqueIds.has(campaign.objid)) {
          return false; // Skip this campaign if we've seen it before
        }
        uniqueIds.add(campaign.objid); // Add to our set of known IDs
        return true;
      });
    }) || [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (status === "pending" && !isFetchingNextPage) {
    return <div className="flex justify-center p-8">Loading campaigns...</div>;
  }

  return (
    <div className="mb-10 space-y-4">
      {campaigns && campaigns.length > 0 && (
        <InfiniteScrollContainer
          onBottomReached={handleLoadMore}
          className="grid gap-4 xl:grid-cols-2"
        >
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.objid}
              campaign={campaign}
              refetch={refetch}
            />
          ))}
        </InfiniteScrollContainer>
      )}

      {isFetchingNextPage && (
        <div className="my-4 flex w-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}

      {status === "error" && (
        <div className="p-4 text-red-500">Error: {error.message}</div>
      )}

      {!hasNextPage && campaigns.length > 0 && (
        <div className="col-span-2 p-4 text-center text-gray-500">
          No more offers to show
        </div>
      )}

      {campaigns.length === 0 && status !== "pending" && (
        <div className="col-span-2 p-8 text-center text-gray-500">
          No offers found with the selected filters
        </div>
      )}
    </div>
  );
};

export default CampaignsSection;
