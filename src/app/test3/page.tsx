"use client";

import { useSession } from "next-auth/react";

import HomeCardSkeleton from "@/components/global/loaders/skeletons/home-card-skeleton";

const page = () => {
  const session = useSession();

  console.log("This is session -> ", session);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <HomeCardSkeleton />
      <HomeCardSkeleton />
      <HomeCardSkeleton />
      <HomeCardSkeleton />
      <HomeCardSkeleton />
      <HomeCardSkeleton />
      <HomeCardSkeleton />
      <HomeCardSkeleton />
      <HomeCardSkeleton />
      <HomeCardSkeleton />
    </div>
  );
};

export default page;
