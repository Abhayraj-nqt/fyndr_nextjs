import { Suspense } from "react";

import GoTopButton from "@/components/global/buttons/go-top-button";
import DefaultCard from "@/components/global/cards/default-card";
import SkeletonRenderer from "@/components/global/skeleton-renderer";
import { RouteParams } from "@/types/global";

import CampaignCardSkeleton from "./_components/skeletons/campaign-card-skeleton";
import CategoryCardSkeleton from "./_components/skeletons/category-card-skeleton";
import CampaignsSection from "../(landing)/_components/sections/campaigns-section";
import CategoriesSection from "../(landing)/_components/sections/categories-section";
import HeroSection from "../(landing)/_components/sections/hero-section";

const Home = async ({ searchParams }: Pick<RouteParams, "searchParams">) => {
  const { lat, lng } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroSection location={{ lat, lng }} />
      <DefaultCard className="my-10 max-w-screen-2xl overflow-x-hidden !border !border-secondary-20 p-2 pt-8 xs:w-11/12 sm:p-4 sm:pt-8">
        <Suspense
          fallback={
            <SkeletonRenderer count={11} skeleton={<CategoryCardSkeleton />} />
          }
        >
          <CategoriesSection />
        </Suspense>
        <Suspense
          key={`${lat}-${lng}`}
          fallback={
            <SkeletonRenderer
              className="my-6 grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] place-items-center gap-4"
              count={12}
              skeleton={<CampaignCardSkeleton />}
            />
          }
        >
          <CampaignsSection location={{ lat, lng }} />
        </Suspense>
      </DefaultCard>
      <GoTopButton />
    </main>
  );
};

export default Home;
