import React, { Suspense } from "react";

import { RouteParams } from "@/types/global";

import BusinessDirectoryFilters from "./_components/business-directory-filters";
import ListingContainer from "../_components/listing-container";
import MobileFilters from "./_components/business-directory-filters/mobile-filters";
import BusinessDirectorySection from "./_components/sections/business-directory-section";

const OfferListing = async ({
  searchParams,
}: Pick<RouteParams, "searchParams">) => {
  const { query = "", dist = 50, lat, lng } = await searchParams;

  return (
    <ListingContainer
      filters={<BusinessDirectoryFilters />}
      heading="Exclusive Offers on Fyndr"
      mobileFilters={<MobileFilters />}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <BusinessDirectorySection
          location={{ lat, lng }}
          distance={Math.max(Number(dist), 20)}
          query={query}
        />
      </Suspense>
    </ListingContainer>
  );
};

export default OfferListing;
