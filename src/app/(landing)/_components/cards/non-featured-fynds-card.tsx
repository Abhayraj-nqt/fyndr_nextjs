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
    <Card className="relative size-full cursor-pointer rounded-10 border-none bg-primary-0.5 p-0 shadow-none transition duration-300 hover:scale-105 sm:max-w-80">
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
        className={`aspect-[2/1] rounded-t-10 object-cover`}
      />
      <div className="flex min-h-[204px] flex-col gap-4 rounded-b-10 bg-primary-0.5 p-4">
        <CardTitle className="h-6">
          <h3 className="body-1 text-black-80">{campaign.biz.bizName}</h3>
        </CardTitle>
        <CardDescription className="flex flex-col gap-4">
          <h4 className="body-3 line-clamp-2 text-black-80">
            {campaign.title}
          </h4>
          <p className="body-5 line-clamp-2 h-8 text-black-60">
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
            <div className="flex-center gap-2">
              {campaign.cmpnOffers[0]?.retailPrice !==
                campaign.cmpnOffers[0]?.offerPrice && (
                <div className="body-5-medium text-black-30 line-through">
                  {campaign.cmpnOffers[0]?.currencySymbol}
                  {campaign.cmpnOffers[0]?.retailPrice?.toFixed(2)}
                </div>
              )}
              {
                <div className="body-1-medium text-primary">
                  {campaign.cmpnOffers[0]?.currencySymbol}
                  {campaign.cmpnOffers[0]?.offerPrice?.toFixed(2)}
                </div>
              }
            </div>
          )}
          {campaign.cmpnType === "coupons" &&
            campaign.cmpnOffers.length > 0 && (
              <div className="body-1-medium text-primary">
                {campaign.cmpnOffers[0]?.couponCode}
              </div>
            )}
          {
            <>
              {campaign.cmpnOffers[0]?.discountType === "%" &&
                lowestPriceOffer.amount > 0 && (
                  <div className="body-3-medium flex-center rounded bg-[#50B85A] px-3 py-1 capitalize text-white">
                    {lowestPriceOffer?.amount}% OFF
                  </div>
                )}
              {campaign.cmpnOffers[0]?.discountType === "flat" &&
                lowestPriceOffer.amount > 0 && (
                  <div className="body-3-medium flex-center rounded bg-[#50B85A] px-3 py-1 capitalize text-white">
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
