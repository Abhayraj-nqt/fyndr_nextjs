import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { parseAddress } from "@/lib/utils";
import { CampaignProps } from "@/types/campaign";

import FeaturedFyndsCard from "./cards/FeaturedFyndsCard";

type Props = {
  campaigns?: CampaignProps[];
};

const FeaturedCampaigns = async ({ campaigns: featuredCampaigns }: Props) => {
  if (!featuredCampaigns || featuredCampaigns.length < 1) return null;

  return (
    <section className="mt-10 flex flex-col rounded-lg bg-primary-100 p-4">
      <h2 className="h2-semibold">Featured Fynds</h2>
      {featuredCampaigns?.length > 0 && (
        <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredCampaigns.map((campaign) => (
            <Link
              key={campaign.objid}
              href={ROUTES.OFFER_DETAILS(campaign.biz.bizName, campaign.qrCode)}
            >
              <FeaturedFyndsCard
                bizName={campaign.biz.bizName}
                currencySymbol={campaign.cmpnOffers[0]?.currencySymbol}
                title={campaign.title}
                address={`${
                  campaign?.cmpnLocs[0]?.distance
                    ? campaign?.cmpnLocs[0]?.distance.toFixed(1)
                    : "0"
                } miles, ${parseAddress(campaign?.cmpnLocs[0])}`}
                imageURL={
                  (campaign.images.length > 0 &&
                    campaign?.images[0]?.img_url) ||
                  "/images/grayPlaceholderFyn.png"
                }
                discountType={campaign.cmpnOffers[0]?.discountType}
                discount={campaign.cmpnOffers[0]?.amount}
                offerPrice={campaign.cmpnOffers[0]?.offerPrice}
                retailPrice={campaign.cmpnOffers[0]?.retailPrice}
                cmpnType={campaign.cmpnType}
              />
            </Link>
          ))}
        </div>
      )}
      {featuredCampaigns.length > 14 && (
        <Button
          variant={"outline"}
          className="body-medium self-center rounded-lg border-2 border-primary-500 px-6 py-3 text-primary-500 hover:bg-light-900 hover:text-primary-500"
          asChild
        >
          <Link href={ROUTES.OFFERS_AND_EVENTS}>See all</Link>
        </Button>
      )}
    </section>
  );
};

export default FeaturedCampaigns;
