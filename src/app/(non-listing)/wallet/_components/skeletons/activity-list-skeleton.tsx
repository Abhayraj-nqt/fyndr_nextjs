import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

import ActivityCardSkeleton from "./activity-card-skeleton";

type Props = {
  count?: number;
};

const ActivityListSkeleton = ({ count = 5 }: Props) => {
  return (
    <>
      <div className="rounded-lg bg-white px-4">
        <div className="no-scrollbar flex w-full flex-col gap-6 overflow-y-scroll pt-4">
          {Array.from({ length: count }).map((_, i) => (
            <ActivityCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Pagination skeleton */}
      <div className="mt-2 rounded-b-lg p-6 shadow-pagination">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="size-4" />
            <Skeleton className="h-4 w-8" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="size-8 rounded" />
            <Skeleton className="size-8 rounded" />
            <Skeleton className="size-8 rounded" />
            <Skeleton className="size-8 rounded" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityListSkeleton;
