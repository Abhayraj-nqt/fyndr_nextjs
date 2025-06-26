"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";

import Button from "@/components/global/buttons";
import InfiniteScrollContainer from "@/components/global/infinite-scroll-container";
import ROUTES from "@/constants/routes";
import { useInfiniteLikedCampaigns } from "@/hooks/campaigns/use-infinite-liked-campaigns";
import { GetLikedCampaignsParams } from "@/types/campaign/campaign.params";
import { Coordinates } from "@/types/global";

import CampaignCard from "../../_components/cards/campaign-card";

type Props = {
  indvId: number;
  location: Coordinates;
};

const CampaignSection = ({ indvId, location }: Props) => {
  const params: GetLikedCampaignsParams["params"] = useMemo(
    () => ({
      page: 1,
      pageSize: 20,
    }),
    []
  );

  const payload: GetLikedCampaignsParams["payload"] = useMemo(
    () => ({
      location,
      userId: Number(indvId),
    }),
    [indvId, location]
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
    // isRefetching,
  } = useInfiniteLikedCampaigns({ params, payload });

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
      <div className="grid gap-4 xl:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-lg bg-gray-200" />
        ))}
      </div>
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
    <section className="w-full max-w-[1550px] rounded-10 bg-white p-4 xs:w-11/12">
      {/* <h1 className="title-7-medium mb-4 text-black-heading">{"My Offers"}</h1> */}
      <div className="space-y-4">
        {campaigns.length > 0 ? (
          <>
            <InfiniteScrollContainer
              onBottomReached={handleLoadMore}
              className="grid gap-4 lg:grid-cols-2"
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
                <p>You&apos;ve seen all saved campaigns!</p>
                <p className="text-sm">
                  Found {campaigns.length} campaigns total
                </p>
              </div>
            )}
          </>
        ) : (
          // Empty state
          <div className="flex min-h-96 flex-col items-center justify-center gap-6 text-center">
            <div className="body-1 text-black-100">
              No saved offers found...
            </div>
            <div className="title-3-medium text-black-100">
              Save Your Favorite Offers with One Click!
            </div>
            <div className="heading-7 text-black-100">
              Every campaign has a heart ❤️. Simply click on the heart icon to
              easily save your favorite offers and access them anytime!
            </div>
            <Link href={ROUTES.OFFERS_AND_EVENTS}>
              <Button variant="primary" stdHeight stdWidth>
                Explore All Offers & Events
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CampaignSection;
