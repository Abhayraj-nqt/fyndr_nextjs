import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import { auth } from "@/auth";
import { DEFAULT_LOCATION, TYPES_OF_DEALS } from "@/constants";
import { RouteParams } from "@/types/global";

import OfferFilters from "./_components/offer-filters";
import ListingContainer from "../_components/listing-container";
import MobileFilters from "./_components/offer-filters/mobile-filters";
import ActionBarSection from "./_components/sections/action-bar-section";
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
    mode = "offline",
    order = "asc",
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
    <ListingContainer
      filters={<OfferFilters />}
      heading="Offers and Events on Fyndr"
      mobileFilters={<MobileFilters />}
      actionBar={<ActionBarSection />}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <CampaignsSection
          location={location}
          dealTypes={dealTypes}
          categories={categoryIds}
          distance={Math.max(Number(dist), 20)}
          indvId={user?.id || null}
          query={query}
          mode={mode}
          order={order as "asc" | "desc"}
        />
      </Suspense>
    </ListingContainer>
  );
};

export default Offers;
