import { notFound } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import DefaultCard from "@/components/global/cards/DefaultCard";
import Stars from "@/components/global/ratings/stars";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_LOCATION } from "@/constants";
import { onGetCampaignByQr } from "@/lib/actions/campaign.action";
import { RouteParams } from "@/types/global";

import CampaignCarousel from "./_components/CampaignCarousel";
import Description from "./_components/description";
import NearestLocation from "./_components/nearest-locations";
import Offers from "./_components/offers";
import RatingsAndReviews from "./_components/ratings-and-reviews";
import SocialIcons from "./_components/social-icons";
import TermsAndConditions from "./_components/terms-and-conditions";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const Offer = async ({ params, searchParams }: RouteParams & Props) => {
  const { slug } = await params;
  const { lat, lng } = await searchParams;

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

  if (slug.length !== 2) {
    return notFound();
  }

  const [, qrCode] = slug;

  const { success, data } = await onGetCampaignByQr(
    { qrCode },
    locationPayload
  );

  if (!success || !data) return null;

  console.log(data);

  const {
    images = [],
    biz: { bizName },
    isFeatured,
    cmpnOffers,
    description,
    finePrint: terms,
    cmpnLocs,
  } = data;

  const campaignImages =
    images?.map((item) => {
      return item?.img_url;
    }) || [];

  return (
    <main className="my-10 flex flex-col items-center justify-center p-4">
      <div className="flex w-full flex-col gap-4 sm:flex-row xl:w-11/12">
        <DefaultCard className="flex size-full flex-col p-0 sm:max-w-72 lg:min-w-96 lg:max-w-96">
          <CampaignCarousel images={campaignImages} />
          <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-medium text-primary-900">{bizName}</h1>
            <Stars outOf={5} ratings={4} />
            {isFeatured && <div>Features</div>}
            <SocialIcons />
          </div>
          <Separator className="hidden sm:block" />
          <NearestLocation locations={cmpnLocs} className={`hidden sm:flex`} />
        </DefaultCard>

        <div className="flex w-full flex-col gap-4">
          <Offers offers={cmpnOffers} />
          <TermsAndConditions terms={terms} />
          <Description desc={description} />
          <DefaultCard>Map</DefaultCard>
          <RatingsAndReviews />

          <DefaultCard className="flex size-full p-4">
            <NearestLocation
              locations={cmpnLocs}
              className={`flex sm:hidden`}
            />
          </DefaultCard>
        </div>
      </div>
    </main>
  );
};

export default Offer;
