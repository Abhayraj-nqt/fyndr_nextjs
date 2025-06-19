import React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CampaignCardSkeleton = () => {
  return (
    <Card className="flex size-full flex-col overflow-hidden border-none bg-slate-50 shadow-none ">
      <Skeleton className="h-44 w-full rounded-b-none rounded-t-10" />

      <CardContent className="space-y-3 p-4">
        {/* Business handle/username */}
        <Skeleton className="h-5 w-64" />

        {/* Service name */}
        <Skeleton className="h-6 w-40" />

        {/* Address */}
        <Skeleton className="h-4 w-full" />
      </CardContent>

      <CardFooter className="flex justify-between p-4 pt-0">
        {/* Price information */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-24" />
        </div>

        {/* Discount badge */}
        <Skeleton className="h-8 w-24 rounded-md" />
      </CardFooter>
    </Card>
  );
};

export default CampaignCardSkeleton;
