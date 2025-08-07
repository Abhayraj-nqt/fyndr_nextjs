import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BusinessDirectoryCardSkeleton = () => {
  return (
    <Card className="grid max-h-fit w-full grid-cols-1 flex-col gap-4 rounded-10 border border-secondary-20 p-4 shadow-none duration-100 lg:grid-cols-5 lg:gap-6">
      {/* Business Image Skeleton */}
      <div className="lg:col-span-2">
        <Skeleton className="aspect-[2/1] size-full rounded-10" />
      </div>

      {/* Business Details Skeleton */}
      <div className="flex flex-1 flex-col gap-6 lg:col-span-3">
        <CardHeader className="flex-between flex-row items-center gap-2 p-0">
          <CardTitle>
            {/* Business Name */}
            <Skeleton className="h-7 w-48" />
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 p-0">
          {/* Address */}
          <CardDescription>
            <Skeleton className="h-4 w-64" />
          </CardDescription>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <Skeleton className="size-5 rounded" />
            <Skeleton className="size-5 rounded" />
            <Skeleton className="size-5 rounded" />
            <Skeleton className="size-5 rounded" />
            <div className="flex items-center gap-1">
              <Skeleton className="size-5 rounded" />
              <Skeleton className="size-4" />
            </div>
          </div>
        </CardContent>

        {/* Action Buttons */}
        <CardFooter className="grid h-full grid-cols-1 content-end gap-4 p-0 lg:grid-cols-2">
          <Skeleton className="h-12 w-full rounded-10" />
          <Skeleton className="h-12 w-full rounded-10" />
        </CardFooter>
      </div>
    </Card>
  );
};

export default BusinessDirectoryCardSkeleton;
