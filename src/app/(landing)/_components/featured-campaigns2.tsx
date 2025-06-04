import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { CampaignProps } from "@/types/campaign";

import FeaturedFyndsCard from "./cards/featured-fynds-card";

type Props = {
  campaigns?: CampaignProps[];
};

const FeaturedCampaigns = async ({ campaigns: featuredCampaigns }: Props) => {
  if (!featuredCampaigns || featuredCampaigns.length < 1) return null;

  return (
    <section className="mt-10 flex flex-col rounded-lg bg-primary-10 p-4">
      <h2 className="h2-semibold">Featured Fynds</h2>
      {featuredCampaigns?.length > 0 && (
        <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      {featuredCampaigns.length >= 12 && (
        <Button
          variant={"outline"}
          className="body-medium self-center rounded-lg border-2 border-primary px-6 py-3 text-primary hover:bg-white hover:text-primary"
          asChild
        >
          <Link href={ROUTES.OFFERS_AND_EVENTS}>See all</Link>
        </Button>
      )}
    </section>
  );
};

export default FeaturedCampaigns;
