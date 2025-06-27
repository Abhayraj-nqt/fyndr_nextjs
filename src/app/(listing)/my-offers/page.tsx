import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

import { onGetLikedCampaigns } from "@/actions/campaign.action";
import { auth } from "@/auth";
import { DEFAULT_LOCATION } from "@/constants";
import handleError from "@/lib/handlers/error";
import { GetLikedCampaignsParams } from "@/types/campaign/campaign.params";

import CampaignSection from "./_components/campaign-section";

const MyOffers = async () => {
  const session = await auth();

  if (!session || !session.user) return null;

  const user = session?.user;
  const location = { ...DEFAULT_LOCATION };

  if (user?.location) {
    location.lat = user.location.lat;
    location.lng = user.location.lng;
  }

  const params: GetLikedCampaignsParams["params"] = {
    page: 1,
    pageSize: 20,
  };

  const payload: GetLikedCampaignsParams["payload"] = {
    location,
    userId: Number(user.id),
  };

  const queryKey = ["my-offers", params, payload];

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
      const { data, success, error } = await onGetLikedCampaigns({
        params,
        payload,
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
    console.error("Error prefetching campaigns:", error);
  }

  // const { success, data } = await onGetLikedCampaigns({ params, payload });

  // if (!success || !data) return <div>Something went wrong</div>;

  // const campaigns = data.campaigns || [];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative mx-auto flex min-h-[80vh] w-full max-w-[1550px] flex-col p-4 xs:w-11/12">
        <h1 className="heading-5 mb-6 mt-2 text-primary">My Favorites</h1>
        <CampaignSection indvId={Number(user.id)} location={location} />
      </div>
    </HydrationBoundary>
  );
};

export default MyOffers;
