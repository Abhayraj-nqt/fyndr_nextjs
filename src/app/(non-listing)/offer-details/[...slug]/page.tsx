import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

import { onGetCampaignByQr } from "@/actions/campaign.action";
import { auth } from "@/auth";
import DefaultCard from "@/components/global/cards/default-card";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_LOCATION } from "@/constants";
import { RouteParams } from "@/types/global";

import CampaignCarousel from "./_components/campaign-carousel";
import NearestLocation from "./_components/nearest-locations";
import DescriptionSection from "./_components/sections/description-section";
import OfferDetailsMap from "./_components/sections/offer-details-map";
import OffersSection from "./_components/sections/offers-section";
import RatingAndReviewsSection from "./_components/sections/rating-and-reviews-section";
import BusinessRatings from "./_components/sections/rating-and-reviews-section/business-ratings";
import RatingAndReviewModal from "./_components/sections/rating-and-reviews-section/rating-and-review-modal";
import TermsAndConditionsSection from "./_components/sections/terms-and-conditions-section";
import SocialIcons from "./_components/social-icons";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const Offer = async ({ params, searchParams }: RouteParams & Props) => {
  const { slug } = await params;
  const {
    lat,
    lng,
    sortBy = "RATING",
    orderBy = "DESC",
    page = 1,
  } = await searchParams;

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

  const { success, data: campaign } = await onGetCampaignByQr({
    params: {
      qrCode,
    },
    payload: locationPayload,
  });

  if (!success || !campaign) return null;

  const {
    images = [],
    biz: { bizName },
    isFeatured,
    cmpnOffers,
    description,
    finePrint: terms,
    cmpnLocs,
  } = campaign;

  const campaignImages =
    images?.map((item) => {
      return item?.img_url;
    }) || [];

  return (
    <>
      <main className="my-10 flex flex-col items-center justify-center p-4">
        <div className="flex w-full max-w-[1550px] flex-col gap-4 sm:flex-row xl:w-11/12">
          <DefaultCard className="flex size-full flex-col p-0 sm:max-w-72 lg:min-w-96 lg:max-w-96">
            <CampaignCarousel images={campaignImages} />
            <div className="flex flex-col gap-4 p-4">
              <h1 className="heading-5 text-secondary">{bizName}</h1>
              <Suspense fallback="Loading...">
                <BusinessRatings bizId={campaign.biz.bizid} compact />
              </Suspense>
              {isFeatured && (
                <Image
                  src={"/images/featured.png"}
                  alt="featured"
                  width={120}
                  height={50}
                  className="m-0 w-28"
                />
              )}
              <SocialIcons campaign={campaign} />
            </div>
            <Separator className="hidden sm:block" />
            <NearestLocation
              locations={cmpnLocs}
              className={`hidden sm:flex`}
            />
          </DefaultCard>

          <div className="flex w-full flex-col gap-4">
            <OffersSection
              campaignId={campaign.objid}
              campaignName={campaign.title}
              bizName={campaign.biz.bizName}
              offers={cmpnOffers}
              campaignImages={campaignImages}
              campaignLocations={cmpnLocs}
              merchantId={campaign.biz.merchantId}
              campaignType={campaign.cmpnType}
            />
            <TermsAndConditionsSection terms={terms} />
            <DescriptionSection desc={description} />
            <OfferDetailsMap campaignLocations={campaign.cmpnLocs} />

            <RatingAndReviewsSection
              business={campaign.biz}
              orderBy={orderBy as "ASC" | "DESC"}
              sortBy={sortBy as "RATING" | "CREATED_DT"}
              page={page !== undefined ? Number(page) : page}
              qrCode={campaign.qrCode}
            />

            <DefaultCard className="flex size-full p-4 sm:hidden">
              <NearestLocation
                locations={cmpnLocs}
                className={`flex sm:hidden`}
              />
            </DefaultCard>
          </div>
        </div>
      </main>
      <RatingAndReviewModal>
        <RatingAndReviewsSection
          business={campaign.biz}
          qrCode={campaign.qrCode}
          orderBy={orderBy as "ASC" | "DESC"}
          sortBy={sortBy as "RATING" | "CREATED_DT"}
          page={page !== undefined ? Number(page) : page}
          showSeeAllComments={false}
          className="p-0"
          enableCommentPagination={true}
          showHeading={false}
        />
      </RatingAndReviewModal>
    </>
  );
};

export default Offer;
