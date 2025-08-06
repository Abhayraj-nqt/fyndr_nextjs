import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { Campaign } from "@/types/campaign/campaign.types";

import NonFeaturedFyndsCard from "./cards/non-featured-fynds-card";

type Props = {
  campaigns: Campaign[];
};

const NearbyOffers = ({ campaigns: nearbyOffers }: Props) => {
  return (
    <section className="mt-10 flex flex-col">
      <h2 className="heading-6-medium text-black-80">Offers Near You</h2>
      <div className="my-6 grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {nearbyOffers.map((item) => (
          <Link
            key={item.objid}
            href={ROUTES.OFFER_DETAILS(item.biz.bizName, item.qrCode)}
          >
            <NonFeaturedFyndsCard campaign={item} />
          </Link>
        ))}
      </div>
      {
        <Button
          variant={"outline"}
          className="body-medium self-center rounded-lg border-2 border-primary px-6 py-3 text-primary hover:bg-white hover:text-primary"
          asChild
        >
          <Link href={ROUTES.OFFERS_AND_EVENTS}>See all offers</Link>
        </Button>
      }
    </section>
  );
};

export default NearbyOffers;
