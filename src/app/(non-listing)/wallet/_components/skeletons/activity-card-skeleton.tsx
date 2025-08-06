import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const ActivityCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 border-b border-dashed pb-4 lg:flex-row">
      <div className="flex items-center gap-4">
        {/* Transaction icon */}
        <Skeleton className="size-8 rounded-full" />

        {/* Date */}
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="flex w-full flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-1">
        <div className="flex flex-nowrap items-center gap-1">
          {/* Transaction description */}
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="flex w-full flex-nowrap justify-between gap-8 sm:w-auto sm:justify-start lg:justify-between">
          {/* Business name */}
          <Skeleton className="h-4 w-32" />

          {/* Invoice ID */}
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      {/* Amount */}
      <div className="flex w-32 items-center text-right lg:justify-end">
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
};

export default ActivityCardSkeleton;
