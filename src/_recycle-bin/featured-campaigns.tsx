import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { Campaign } from "@/types/campaign/campaign.types";

import FeaturedFyndsCard from "../app/(landing)/_components/cards/featured-fynds-card";

type Props = {
  onGetFeaturedCampaigns: () => Campaign[];
};

const FeaturedCampaigns = ({ onGetFeaturedCampaigns }: Props) => {
  const featuredCampaigns = onGetFeaturedCampaigns();

  return (
    <section className="mt-10 flex flex-col rounded-lg bg-primary-10 p-4">
      <h2 className="h2-semibold">Featured Fynds</h2>
      {featuredCampaigns?.length > 0 && (
        <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
          {featuredCampaigns.map((campaign) => (
            <Link
              key={campaign.objid}
              href={ROUTES.OFFER_DETAILS(campaign.biz.bizName, campaign.qrCode)}
            >
              <FeaturedFyndsCard campaign={campaign} />
            </Link>
          ))}
        </div>
      )}
      {
        <Button
          variant={"outline"}
          className="body-medium self-center rounded-lg border-2 border-primary px-6 py-3 text-primary hover:bg-white hover:text-primary"
          asChild
        >
          <Link href={ROUTES.OFFERS_AND_EVENTS}>See all</Link>
        </Button>
      }
    </section>
  );
};

export default FeaturedCampaigns;
