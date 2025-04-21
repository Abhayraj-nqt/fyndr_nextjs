import { Suspense } from "react";

import GoTopButton from "@/components/global/buttons/GoTopButton";
import DefaultCard from "@/components/global/cards/default-card";
import { RouteParams } from "@/types/global";

import CampaignsSection from "./_components/sections/campaigns-section";
import CategoriesSection from "./_components/sections/categories-section";
import HeroSection from "./_components/sections/hero-section";

const Home = async ({ searchParams }: Pick<RouteParams, "searchParams">) => {
  const { lat, lng } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Suspense fallback={<div className="h-80">Loading...</div>}>
        <HeroSection location={{ lat, lng }} />
      </Suspense>

      <DefaultCard className="my-10 max-w-screen-2xl p-2 pt-8 xs:w-11/12 sm:p-4 sm:pt-8">
        <Suspense fallback={<div>Loading...</div>}>
          <CategoriesSection />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <CampaignsSection location={{ lat, lng }} />
        </Suspense>
      </DefaultCard>
      <GoTopButton />
    </main>
  );
};

export default Home;
