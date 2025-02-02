import { Suspense } from "react";

import GoTopButton from "@/components/global/buttons/GoTopButton";
import DefaultCard from "@/components/global/cards/DefaultCard";
import { api } from "@/lib/api";
import { LocationService } from "@/lib/location-service";

import NonFeaturedFyndsCard from "./_components/cards/NonFeaturedFyndsCard";
import FeaturedFynds from "./_components/FeaturedFynds";
import HeroSection from "./_components/HeroSection";
import HomeFilter from "./_components/HomeFilter";
import NearbyOffers from "./_components/NearbyOffers";

const Home = async () => {
  const { success: catSuccess, data: categories } =
    await api.categories.getAll();

  const location = await LocationService.getLocation();
  const { success: campaignSuccess, data: campaignData } =
    await api.campaigns.getCampaigns(
      {
        page: 0,
        pageSize: 500,
      },
      {
        indvId: 52,
        distance: 50,
        location,
        categories: [],
        fetchById: "none",
        fetchByGoal: "INSTORE",
      }
    );

  return (
    <main className="flex  min-h-screen flex-col items-center">
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
      </Suspense>

      <DefaultCard className="my-10 p-2 pt-8 xs:w-11/12 sm:p-4 sm:pt-8">
        {catSuccess && <HomeFilter categories={categories!} />}
        {/* <DataRenderer
          success={success}
          error={error}
          data={categories}
          empty={EMPTY_CATEGORY}
          render={(categories) => <HomeFilter categories={categories!} />}
        /> */}

        {campaignSuccess && campaignData && (
          <FeaturedFynds campaigns={campaignData?.campaigns} />
        )}

        <section className="mt-10">
          <h2 className="h2-semibold">Explore Exciting Activities Nearby</h2>
          <div className="my-6 grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {/* <NonFeaturedFyndsCard /> */}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="h2-semibold">Discover Dining Experiences Near You</h2>
          <div className="my-6 grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {/* <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard /> */}
          </div>
        </section>
        <section className="mt-10">
          <h2 className="h2-semibold">Nearby Beauty Finds</h2>
          <div className="my-6 grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {/* <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard /> */}
          </div>
        </section>

        {campaignSuccess && campaignData && (
          <NearbyOffers campaigns={campaignData?.campaigns} />
        )}

        <section className="mt-10">
          <h2 className="h2-semibold">Events Near You</h2>
          <div className="my-6 grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {/* <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard />
            <NonFeaturedFyndsCard /> */}
          </div>
        </section>
      </DefaultCard>
      <GoTopButton />
    </main>
  );
};

export default Home;
