import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
// import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import { onGetCampaigns } from "@/actions/campaign.action";
import { auth } from "@/auth";
import { DEFAULT_LOCATION, TYPES_OF_DEALS } from "@/constants";
import handleError from "@/lib/handlers/error";
import { GetCampaignsParams } from "@/types/campaign/campaign.params";
import { RouteParams } from "@/types/global";

import ListingContainer from "../_components/listing-container";
import MobileFilters from "./_components/offer-filters/mobile-filters";
import OfferFilters from "../offers-and-events/_components/offer-filters";
import CampaignsSection from "./_components/sections/campaigns-section";
import ActionBarSection from "../offers-and-events/_components/sections/action-bar-section";

const Offers = async ({ searchParams }: Pick<RouteParams, "searchParams">) => {
  const resolvedSearchParams = await searchParams;
  const {
    lat,
    lng,
    types = "",
    categories = "",
    dist = 50,
    query,
    mode = "offline",
    order = "asc",
    locQrId = null,
  } = resolvedSearchParams;

  const location = DEFAULT_LOCATION;
  const session = await auth();
  const user = session?.user;

  if (user?.location) {
    location.lat = user.location.lat;
    location.lng = user.location.lng;
  }

  if (lat && lng) {
    location.lat = Number(lat);
    location.lng = Number(lng);
  }

  let dealTypes: string[] = [];
  if (types) {
    dealTypes = types.split(",").filter(Boolean);
  }

  if (dealTypes.length === 0 || dealTypes.includes("ALL")) {
    dealTypes = TYPES_OF_DEALS.filter((item) => item.value !== "ALL").map(
      (item) => item.value
    );
  }

  const categoryIds: number[] = categories
    ? categories
        .split(",")
        .filter(Boolean)
        .map((item) => Number(item))
        .filter((num) => !isNaN(num))
    : [];

  const params: GetCampaignsParams["params"] = {
    search: query,
    page: 1,
    pageSize: 20,
    orderBy: (order.toUpperCase() === "DESC" ? "DESC" : "ASC") as
      | "ASC"
      | "DESC",
  };

  const payload: GetCampaignsParams["payload"] = {
    indvId: user?.id ? Number(user.id) : null,
    distance: Math.max(Number(dist), 20),
    location,
    campaignType: dealTypes,
    categories: categoryIds,
    fetchById: locQrId !== null ? "locQR" : "none",
    fetchByGoal: mode === "offline" ? "INSTORE" : "ONLINE",
    locQRId: locQrId ? Number(locQrId) : null,
  };

  const queryKey = ["campaigns", params, payload];

  // Create QueryClient and prefetch initial data
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      },
    },
  });

  try {
    // Only prefetch if not already cached
    const existingData = queryClient.getQueryData(queryKey);

    if (!existingData) {
      const { data, success } = await onGetCampaigns({
        params,
        payload,
      });

      if (success && data) {
        // Prefetch the query with initial data
        queryClient.setQueryData(queryKey, {
          pages: [
            {
              ...data,
              currentPage: 1,
            },
          ],
          pageParams: [1],
        });
      } else {
        queryClient.setQueryData(queryKey, {
          pages: [
            {
              campaigns: [],
              last: false,
              currentPage: 1,
            },
          ],
          pageParams: [1],
        });
      }
    }
  } catch (error) {
    handleError(error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListingContainer
        filters={<OfferFilters />}
        heading="Offers and Events on Fyndr"
        mobileFilters={<MobileFilters />}
        actionBar={<ActionBarSection />}
      >
        <Suspense
          // key={`${location.lat}-${location.lng}-${dealTypes.toString()}-${Math.max(Number(dist), 20)}-${user?.id}-${query}-${mode}-${order}`}
          fallback={<div>Loading...</div>}
        >
          <CampaignsSection
            location={location}
            dealTypes={dealTypes}
            categories={categoryIds}
            distance={Math.max(Number(dist), 20)}
            indvId={user?.id || null}
            query={query}
            mode={mode}
            order={order as "asc" | "desc"}
            locQrId={locQrId ? Number(locQrId) : null}
          />
        </Suspense>
      </ListingContainer>
    </HydrationBoundary>
  );
};

export default Offers;
