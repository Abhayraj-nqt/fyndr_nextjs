"use client";

import { Loader2 } from "lucide-react";
import { useCallback, useMemo } from "react";

import CampaignCard from "@/app/(listing)/offers-and-events/_components/campaign-card";
import Button from "@/components/global/buttons";
import InfiniteScrollContainer from "@/components/global/infinite-scroll-container";
import SkeletonRenderer from "@/components/global/skeleton-renderer";
import { useInfiniteCampaigns } from "@/hooks/campaigns/use-infinite-campaigns";
import { GetCampaignsParams } from "@/types/campaign/campaign.params";
import { Coordinates } from "@/types/global";

type Props = {
  location: Coordinates;
  indvId: string | number | null;
  dealTypes: string[];
  categories: number[];
  distance: number;
  query?: string;
  mode: string;
  order: "asc" | "desc";
  locQrId?: number | null;
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
  locQrId,
}: Props) => {
  const params: GetCampaignsParams["params"] = useMemo(
    () => ({
      search: query?.trim() || undefined,
      page: 1,
      pageSize: 20,
      orderBy: (order.toUpperCase() === "DESC" ? "DESC" : "ASC") as
        | "ASC"
        | "DESC",
    }),
    [query, order]
  );

  const payload: GetCampaignsParams["payload"] = useMemo(
    () => ({
      indvId: indvId ? Number(indvId) : null,
      distance,
      location,
      campaignType: dealTypes,
      categories,
      fetchById: locQrId !== null ? "locQR" : "none",
      fetchByGoal: mode === "offline" ? "INSTORE" : "ONLINE",
      locQRId: locQrId ? Number(locQrId) : null,
    }),
    [indvId, distance, location, dealTypes, categories, mode, locQrId]
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
  } = useInfiniteCampaigns(params, payload);

  // Flatten campaigns from all pages - no duplicate filtering needed if API is correct
  const campaigns = useMemo(() => {
    return data?.pages.flatMap((page) => page.campaigns) || [];
  }, [data?.pages]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  if (status === "pending") {
    return (
      <SkeletonRenderer
        count={6}
        skeleton={<div className="h-48 animate-pulse rounded-lg bg-gray-200" />}
        className="!xl:grid-cols-2 !grid !gap-4"
      />
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 text-red-500">
          Error loading offers: {error?.message || "Something went wrong"}
        </div>
        <button
          onClick={handleRefetch}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mb-10 space-y-4">
      {campaigns.length > 0 ? (
        <>
          <InfiniteScrollContainer
            onBottomReached={handleLoadMore}
            className="grid gap-4 xl:grid-cols-2"
          >
            {campaigns.map((campaign) => (
              <CampaignCard
                key={`${campaign.objid}-${campaign.title}`}
                campaign={campaign}
                refetch={handleRefetch}
              />
            ))}
          </InfiniteScrollContainer>

          {/* Loading indicator for next page */}
          {isFetchingNextPage && (
            <div className="flex w-full items-center justify-center py-8">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Loader2 className="size-4 animate-spin" />
                Loading more campaigns...
              </div>
            </div>
          )}

          {/* End of results indicator */}
          {!hasNextPage && !isFetchingNextPage && (
            <div className="py-8 text-center text-gray-500">
              <p>You&apos;ve seen all available campaigns!</p>
              <p className="text-sm">
                Found {campaigns.length} campaigns total
              </p>
            </div>
          )}
        </>
      ) : (
        // Empty state
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-4 text-lg font-medium text-gray-700">
            No offers found
          </div>
          <div className="mb-6 text-gray-500">
            Try adjusting your filters or search terms to find more offers
          </div>
          <Button onClick={handleRefetch} variant="primary" stdHeight stdWidth>
            Refresh
          </Button>
        </div>
      )}
    </div>
  );
};

export default CampaignsSection;
