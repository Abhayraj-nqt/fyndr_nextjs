import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { parseAddress } from "@/lib/utils";

import NonFeaturedFyndsCard from "./cards/NonFeaturedFyndsCard";

type Props = {
  campaigns: Campaign[];
};

const FeaturedFynds = ({ campaigns }: Props) => {
  if (!campaigns) return null;

  const featured = false;

  const featuredCampaigns =
    campaigns
      ?.filter((item) => item.isFeatured && item.cmpnType !== "brochure")
      .slice(0, featured ? undefined : 15) || [];

  return (
    <section className="mt-10 flex flex-col rounded-lg bg-primary-100 p-4">
      <h2 className="h2-semibold">Featured Fynds</h2>
      {featuredCampaigns?.length > 0 && (
        <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
          {featuredCampaigns.map((campaign) => (
            <Link
              key={campaign.objid}
              href={`/offer-details/${campaign?.biz?.bizName?.replace(
                /[.\W]+/g,
                "-"
              )}/${campaign?.qrCode}`}
            >
              <NonFeaturedFyndsCard
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
              />
            </Link>
          ))}
        </div>
      )}
      {
        <Button
          variant={"outline"}
          className="body-medium self-center rounded-lg border-2 border-primary-500 px-6 py-3 text-primary-500 hover:bg-light-900 hover:text-primary-500"
          asChild
        >
          <Link href={ROUTES.OFFERS}>See all</Link>
        </Button>
      }
    </section>
  );
};

export default FeaturedFynds;
