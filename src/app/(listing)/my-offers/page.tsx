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
      <div className="flex-center relative flex min-h-[80vh] flex-1 flex-col p-4">
        <CampaignSection indvId={Number(user.id)} location={location} />
      </div>
    </HydrationBoundary>
    // <>
    //   <div className="flex-center relative flex min-h-[80vh] flex-1 flex-col p-4">
    //     {/* <CampaignSection indvId={Number(user.id)} location={location} /> */}
    //     <section className="w-full max-w-[1550px] rounded-10 bg-white p-4 xs:w-11/12">
    //       {campaigns.length > 0 ? (
    //         <div className="grid gap-4 lg:grid-cols-2">
    //           {campaigns.map((campaign) => (
    //             <CampaignCard
    //               key={`${campaign.objid}-${campaign.title}`}
    //               campaign={campaign}
    //               // refetch={handleRefetch}
    //             />
    //           ))}
    //         </div>
    //       ) : (
    //         <>
    //           <div className="flex min-h-96 flex-col items-center justify-center gap-6 text-center">
    //             <div className="body-1 text-black-100">
    //               No saved offers found...
    //             </div>
    //             <div className="title-3-medium text-black-100">
    //               Save Your Favorite Offers with One Click!
    //             </div>
    //             <div className="heading-7 text-black-100">
    //               Every campaign has a heart ❤️. Simply click on the heart icon
    //               to easily save your favorite offers and access them anytime!
    //             </div>
    //             <Link href={ROUTES.OFFERS_AND_EVENTS}>
    //               <Button variant="primary" stdHeight stdWidth>
    //                 Explore All Offers & Events
    //               </Button>
    //             </Link>
    //           </div>
    //         </>
    //       )}
    //     </section>
    //   </div>
    // </>
  );
};

export default MyOffers;
