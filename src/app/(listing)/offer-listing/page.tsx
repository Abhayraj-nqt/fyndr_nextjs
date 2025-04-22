import React, { Suspense } from "react";

import { RouteParams } from "@/types/global";

import BusinessDirectoryFilters from "./_components/business-directory-filters";
import MobileFilters from "./_components/business-directory-filters/mobile-filters";
import BusinessDirectorySection from "./_components/sections/business-directory-section";

const OfferListing = async ({
  searchParams,
}: Pick<RouteParams, "searchParams">) => {
  const { query = "", dist = 50, lat, lng } = await searchParams;

  return (
    <main className="relative w-full p-4">
      <div className="relative flex flex-col flex-nowrap gap-4 md:flex-row">
        <section className="hidden h-fit w-80 min-w-80 rounded-lg bg-light-900 md:flex">
          <BusinessDirectoryFilters />
        </section>
        <section className="flex md:hidden">
          <MobileFilters />
        </section>

        <section className="w-full pt-4 md:pt-0">
          <h1 className="h3-semibold mb-4">Exclusive Offers on Fyndr</h1>

          <Suspense fallback={<div>Loading...</div>}>
            <BusinessDirectorySection
              location={{ lat, lng }}
              distance={Math.max(Number(dist), 20)}
              query={query}
            />
          </Suspense>
        </section>
      </div>
    </main>
  );
};

export default OfferListing;
