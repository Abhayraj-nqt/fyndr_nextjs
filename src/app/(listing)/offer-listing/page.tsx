import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React, { Suspense } from "react";

import { onGetBusinessDirectory } from "@/actions/store.action";
import { auth } from "@/auth";
import { DEFAULT_LOCATION } from "@/constants";
import handleError from "@/lib/handlers/error";
import { RouteParams } from "@/types/global";
import { GetBusinessDirectoryParams } from "@/types/store/store.params";

import ListingContainer from "../_components/listing-container";
import BusinessDirectoryFilters from "./_components/business-directory-filters";
import MobileFilters from "./_components/business-directory-filters/mobile-filters";
import BusinessDirectorySection from "./_components/sections/business-directory-section";

type Props = {
  params: Promise<{ category: string }>;
};

const OfferListing = async ({ searchParams, params }: RouteParams & Props) => {
  const { category } = await params;
  const { lat, lng, dist = 50 } = await searchParams;

  const locationPayload = DEFAULT_LOCATION;

  const session = await auth();
  const user = session?.user;

  if (user && user.location) {
    locationPayload.lat = user?.location.lat;
    locationPayload.lng = user?.location.lng;
  }

  if (lat && lng) {
    locationPayload.lat = Number(lat);
    locationPayload.lng = Number(lng);
  }

  const queryParams: GetBusinessDirectoryParams["params"] = {
    page: 1,
    pageSize: 100,
    search: category,
  };

  const queryPayload: GetBusinessDirectoryParams["payload"] = {
    isCategory: false,
    distance: Math.max(Number(dist), 20),
    location: locationPayload,
    indvId: user?.id ? Number(user.id) : null,
  };

  const queryKey = ["business-directory", queryParams, queryPayload];

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      },
    },
  });

  try {
    const existingData = queryClient.getQueryData(queryKey);

    if (!existingData) {
      const { data, success, error } = await onGetBusinessDirectory({
        params: queryParams,
        payload: queryPayload,
      });

      if (!success || error) {
        return handleError(error);
      }

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
      }
    }
  } catch (error) {
    handleError(error);
    console.error("Error prefetching business directory:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListingContainer
        filters={<BusinessDirectoryFilters />}
        heading="Exclusive Offers on Fyndr"
        mobileFilters={<MobileFilters />}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <BusinessDirectorySection
            location={locationPayload}
            distance={Math.max(Number(dist), 20)}
            query={category}
            indvId={user?.id || null}
          />
        </Suspense>
      </ListingContainer>
    </HydrationBoundary>
  );
};

export default OfferListing;
