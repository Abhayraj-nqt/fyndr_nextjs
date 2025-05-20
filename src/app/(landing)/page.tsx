import { Suspense } from "react";

import GoTopButton from "@/components/global/buttons/go-top-button";
import DefaultCard from "@/components/global/cards/default-card";
// import HomeCardSkeleton from "@/components/global/loaders/skeletons/home-card-skeleton";
import { RouteParams } from "@/types/global";

import CampaignsSection from "../(landing)/_components/sections/campaigns-section";
import CategoriesSection from "../(landing)/_components/sections/categories-section";
import HeroSection from "../(landing)/_components/sections/hero-section";

const Home = async ({ searchParams }: Pick<RouteParams, "searchParams">) => {
  const { lat, lng } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroSection location={{ lat, lng }} />
      <DefaultCard className="my-10 max-w-screen-2xl overflow-x-hidden p-2 pt-8 xs:w-11/12 sm:p-4 sm:pt-8">
        <Suspense fallback={<div>Loading...</div>}>
          <CategoriesSection />
        </Suspense>
        {/* <Suspense key={`${lat}-${lng}`} fallback={<HomeCardSkeleton />}> */}
        <Suspense key={`${lat}-${lng}`} fallback={<div>Loading...</div>}>
          <CampaignsSection location={{ lat, lng }} />
        </Suspense>
      </DefaultCard>
      <GoTopButton />
    </main>
  );
};

export default Home;
