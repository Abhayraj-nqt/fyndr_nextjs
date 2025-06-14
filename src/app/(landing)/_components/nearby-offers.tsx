import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { parseAddress } from "@/lib/utils/address";
import { getLowestOfferPrice } from "@/lib/utils/campaign";
import { CampaignProps } from "@/types/campaign";

import NonFeaturedFyndsCard from "./cards/non-featured-fynds-card";

type Props = {
  campaigns: CampaignProps[];
};

const NearbyOffers = ({ campaigns: nearbyOffers }: Props) => {
  return (
    <section className="mt-10 flex flex-col">
      <h2 className="h2-semibold">Offers Near You</h2>
      <div className="my-6 grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {nearbyOffers.map((item) => (
          <Link
            key={item.objid}
            href={ROUTES.OFFER_DETAILS(item.biz.bizName, item.qrCode)}
          >
            <NonFeaturedFyndsCard
              bizName={item.biz.bizName}
              currencySymbol={item.cmpnOffers[0]?.currencySymbol}
              title={item.title}
              address={`${parseAddress(item?.cmpnLocs[0])}`}
              imageURL={
                (item.images &&
                  item.images.length > 0 &&
                  item?.images[0]?.img_url) ||
                "/images/grayPlaceholderFyn.png"
              }
              discountType={item.cmpnOffers[0]?.discountType}
              discount={getLowestOfferPrice(item.cmpnOffers)?.amount}
              offerPrice={item.cmpnOffers[0]?.offerPrice}
              retailPrice={item.cmpnOffers[0]?.retailPrice}
            />
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
