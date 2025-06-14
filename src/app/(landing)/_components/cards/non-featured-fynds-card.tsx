import React from "react";

import PlaceholderImage from "@/components/global/placeholder-image";
import { parseAddress } from "@/lib/utils/address";
import { getLowestOfferPrice } from "@/lib/utils/campaign";
import { CampaignProps } from "@/types/campaign";

import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../../../../components/ui/card";

type Props = {
  campaign: CampaignProps;
};

const NonFeaturedFyndsCard = ({ campaign }: Props) => {
  const lowestPriceOffer = getLowestOfferPrice(campaign.cmpnOffers);

  return (
    <Card className="relative w-full cursor-pointer rounded-md border-secondary-10 p-0 shadow-none transition duration-500 hover:scale-105 sm:max-w-80">
      <PlaceholderImage
        src={
          (campaign.images &&
            campaign.images?.length > 0 &&
            campaign?.images[0]?.img_url) ||
          "/images/fyndr-placeholder-gray.svg"
        }
        alt={`${campaign.title}: Book on Fyndr now!`}
        width={600}
        height={300}
        className={`aspect-[2/1] rounded-md object-cover`}
      />
      <div className="min-h-48 space-y-4 rounded-b-md bg-primary-10 p-4">
        <CardTitle className="h-6">{campaign.biz.bizName}</CardTitle>
        <CardDescription className="body-regular">
          <h4 className="paragraph-regular line-clamp-2 h-11 text-black">
            {campaign.title}
          </h4>
          <p className="line-clamp-2 h-10 text-secondary-80">
            {
              parseAddress(campaign?.cmpnLocs[0], {
                compactMode: true,
                includeDistance: true,
              }).formatted
            }
          </p>
        </CardDescription>
        <CardFooter className="flex-between flex p-0">
          {campaign.cmpnType !== "coupons" && (
            <div className="flex gap-1">
              {campaign.cmpnOffers[0]?.retailPrice !==
                campaign.cmpnOffers[0]?.offerPrice && (
                <div className="small-regular text-secondary-70 line-through">
                  {campaign.cmpnOffers[0]?.currencySymbol}
                  {campaign.cmpnOffers[0]?.retailPrice?.toFixed(2)}
                </div>
              )}
              {
                <div className="text-primary">
                  {campaign.cmpnOffers[0]?.currencySymbol}
                  {campaign.cmpnOffers[0]?.offerPrice?.toFixed(2)}
                </div>
              }
            </div>
          )}
          {campaign.cmpnType === "coupons" &&
            campaign.cmpnOffers.length > 0 && (
              <div className="text-primary">
                {campaign.cmpnOffers[0]?.couponCode}
              </div>
            )}
          {
            <>
              {campaign.cmpnOffers[0]?.discountType === "%" &&
                lowestPriceOffer.amount > 0 && (
                  <div className="paragraph-semibold rounded bg-green-500 px-3 py-1 capitalize text-white">
                    {lowestPriceOffer?.amount}% OFF
                  </div>
                )}
              {campaign.cmpnOffers[0]?.discountType === "flat" &&
                lowestPriceOffer.amount > 0 && (
                  <div className="paragraph-semibold rounded bg-green-500 px-3 py-1 capitalize text-white">
                    {lowestPriceOffer?.currencySymbol}
                    {lowestPriceOffer?.amount?.toFixed(2)} OFF
                  </div>
                )}
            </>
          }
        </CardFooter>
      </div>
    </Card>
  );
};

export default NonFeaturedFyndsCard;
