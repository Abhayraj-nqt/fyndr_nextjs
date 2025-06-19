"use client";

import { Loader2 } from "lucide-react";
import React, { useCallback, useMemo } from "react";

import Button from "@/components/global/buttons";
import InfiniteScrollContainer from "@/components/global/infinite-scroll-container";
import SkeletonRenderer from "@/components/global/skeleton-renderer";
import { useInfiniteBusinessDirectory } from "@/hooks/store/use-infinite-business-directory";
import { Coordinates } from "@/types/global";
import { GetBusinessDirectoryParams } from "@/types/store/store.params";

import BusinessDirectoryCard from "../business-directory-card";
import BusinessDirectoryCardSkeleton from "../skeletons/business-directory-card-skeleton";

type Props = {
  location: Coordinates;
  indvId: number | null | string;
  query: string;
  distance: number;
};

const BusinessDirectorySection = ({
  location,
  distance,
  query = "",
  indvId,
}: Props) => {
  const params: GetBusinessDirectoryParams["params"] = useMemo(
    () => ({
      page: 1,
      pageSize: 20,
      search: query?.trim() || undefined,
    }),
    [query]
  );

  const payload: GetBusinessDirectoryParams["payload"] = useMemo(
    () => ({
      distance,
      indvId: typeof indvId === "string" ? Number(indvId) : indvId,
      isCategory: false,
      location,
    }),
    [distance, indvId, location]
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
  } = useInfiniteBusinessDirectory({
    params,
    payload,
  });

  const businessDirectory = useMemo(() => {
    return data?.pages.flatMap((page) => page.bizdir) || [];
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
      <div className="flex w-full flex-col gap-4">
        <SkeletonRenderer
          count={6}
          skeleton={<BusinessDirectoryCardSkeleton />}
        />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 text-red-500">
          Error loading business: {error?.message || "Something went wrong"}
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
    <div className="flex w-full flex-col gap-4">
      {businessDirectory.length > 0 ? (
        <>
          <InfiniteScrollContainer
            onBottomReached={handleLoadMore}
            className="flex w-full flex-col gap-4"
          >
            {businessDirectory.map((bizDir) => (
              <BusinessDirectoryCard
                key={`${bizDir.bizid}-${bizDir.objid}`}
                businessDirectory={bizDir}
              />
            ))}
          </InfiniteScrollContainer>

          {/* Loading indicator for next page */}
          {isFetchingNextPage && (
            <div className="flex w-full items-center justify-center py-8">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Loader2 className="size-4 animate-spin" />
                Loading more business...
              </div>
            </div>
          )}

          {/* End of results indicator */}
          {!hasNextPage && !isFetchingNextPage && (
            <div className="py-8 text-center text-gray-500">
              <p>You&apos;ve seen all available business!</p>
              <p className="text-sm">
                Found {businessDirectory.length} business total
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-4 text-lg font-medium text-gray-700">
            No business found
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

export default BusinessDirectorySection;
