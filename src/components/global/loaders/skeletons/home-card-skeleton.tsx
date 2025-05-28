import { count } from "console";

import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const HomeCardSkeleton = () => {
  return (
    // <Card className="w-full max-w-sm overflow-hidden">
    //   <CardHeader className="p-0">
    //     <div className="relative">
    //       <Skeleton className="h-40 w-full rounded-t-lg" />
    //       <div className="absolute right-2 top-2">
    //         <Skeleton className="size-6 rounded-full" />
    //       </div>
    //     </div>
    //   </CardHeader>

    //   <CardContent className="space-y-3 p-4">
    //     <div className="flex items-center justify-between">
    //       <Skeleton className="h-6 w-32" />
    //       <Skeleton className="h-6 w-16 rounded-full" />
    //     </div>

    //     <Skeleton className="h-4 w-48" />
    //   </CardContent>

    //   <CardFooter className="flex justify-between p-4 pt-0">
    //     <div className="space-y-1">
    //       <Skeleton className="h-3 w-12" />
    //       <Skeleton className="h-5 w-20" />
    //     </div>
    //     <Skeleton className="h-8 w-20 rounded-md" />
    //   </CardFooter>
    // </Card>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array(12)
        .fill(0)
        .map((_, index) => (
          <Card
            key={index}
            className="flex w-full max-w-sm overflow-hidden border-none bg-slate-50 shadow-none "
          >
            {/* Image area */}
            <Skeleton className="h-48 w-full rounded-t-lg" />

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
        ))}
    </div>
  );
};

export default HomeCardSkeleton;
