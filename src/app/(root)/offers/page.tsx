import React, { Suspense } from "react";

import {} from // SidebarProvider,
// SidebarTrigger
"@/components/ui/sidebar";
import { TYPES_OF_DEALS } from "@/constants";
import { RouteParams } from "@/types/global";

// import OfferFilter from "./_components/OfferFilter";
import OfferFilters from "./_components/offer-filters";
import MobileFilters from "./_components/offer-filters/mobile-filters";
import CampaignsSection from "./_components/sections/campaigns-section";

const Offers = async ({ searchParams }: Pick<RouteParams, "searchParams">) => {
  const {
    lat,
    lng,
    types = "",
    categories = "",
    dist = 50,
  } = await searchParams;

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
        <section className="hidden h-fit w-80 min-w-80 rounded-lg bg-light-900 md:flex">
          <OfferFilters />
        </section>
        <section className="flex md:hidden">
          <MobileFilters />
        </section>

        <section className="pt-4 md:pt-0">
          <h1 className="h3-semibold mb-4">Offers and Events on Fyndr</h1>

          <Suspense fallback={<div>Loading...</div>}>
            <CampaignsSection
              location={{ lat, lng }}
              dealTypes={dealTypes}
              categories={categoryIds}
              distance={Math.max(Number(dist), 20)}
            />
          </Suspense>
        </section>
      </div>
    </main>
  );
};

export default Offers;
