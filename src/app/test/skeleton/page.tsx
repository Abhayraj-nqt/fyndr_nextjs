"use client";

import { useSession } from "next-auth/react";

import HomeCardSkeleton from "@/components/global/loaders/skeletons/home-card-skeleton";

const TestSkeletonPage = () => {
  const session = useSession();

  console.log("This is session -> ", session);

  return (
    <div className="">
      <HomeCardSkeleton />
      {/* <HomeCardSkeleton />
      <HomeCardSkeleton />
      <HomeCardSkeleton /> */}
      {/* <HomeCardSkeleton />
      <HomeCardSkeleton />
      <HomeCardSkeleton />
      <HomeCardSkeleton />
      <HomeCardSkeleton />
      <HomeCardSkeleton /> */}
    </div>
  );
};

export default TestSkeletonPage;
