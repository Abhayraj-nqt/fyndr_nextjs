import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import { auth } from "@/auth";
import { DEFAULT_LOCATION, TYPES_OF_DEALS } from "@/constants";
import { RouteParams } from "@/types/global";

import OfferFilters from "./_components/offer-filters";
import MobileFilters from "./_components/offer-filters/mobile-filters";
// import CampaignsSection from "./_components/sections/campaigns-section";

const CampaignsSection = dynamic(
  () => import("./_components/sections/campaigns-section"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const Offers = async ({ searchParams }: Pick<RouteParams, "searchParams">) => {
  const {
    lat,
    lng,
    types = "",
    categories = "",
    dist = 50,
    query,
  } = await searchParams;

  const location = DEFAULT_LOCATION;

  const session = await auth();
  const user = session?.user;

  if (user && user.location) {
    location.lat = user?.location.lat;
    location.lng = user?.location.lng;
  }

  if (lat && lng) {
    location.lat = Number(lat);
    location.lng = Number(lng);
  }

  const dealTypes: string[] = types.split(",") || ["ALL"];
  if (dealTypes.length > 0 && dealTypes[0] === "") {
    dealTypes[0] = "ALL";
  }

  if (dealTypes.length > 0 && dealTypes[0] === "ALL") {
    dealTypes.pop();
    TYPES_OF_DEALS.filter((item) => item.value !== "ALL").map((item) => {
      dealTypes.push(item.value);
      return item;
    });
  }

  dealTypes.sort((a, b) => a.length - b.length);

  const categoryIds: number[] =
    categories
      .split(",")
      .filter((item) => item.length > 0)
      .map((item) => Number(item))
      .sort((a, b) => a - b) || [];

  return (
    <main className="relative w-full p-4">
      <div className="relative flex flex-col flex-nowrap gap-4 md:flex-row">
        <section className="hidden h-fit w-80 min-w-80 rounded-lg bg-white md:flex">
          <OfferFilters />
        </section>
        <section className="z-20 flex md:hidden">
          <MobileFilters />
        </section>

        <section className="mt-5 w-full rounded-lg bg-white p-4 md:mt-0">
          <h1 className="base-semibold mb-4 text-secondary">
            Offers and Events on Fyndr
          </h1>

          <Suspense fallback={<div>Loading...</div>}>
            <CampaignsSection
              location={location}
              dealTypes={dealTypes}
              categories={categoryIds}
              distance={Math.max(Number(dist), 20)}
              indvId={user?.id || null}
              query={query}
            />
          </Suspense>
        </section>
      </div>
    </main>
  );
};

export default Offers;
