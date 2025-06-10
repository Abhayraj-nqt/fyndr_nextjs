import Image from "next/image";
import React from "react";

import { Card } from "@/components/ui/card";
import { CampaignOfferProps } from "@/types/campaign";

type Props = {
  className?: string;
  offer: CampaignOfferProps;
};

const SeeMoreCard = ({ offer, className }: Props) => {
  const discount = `${
    offer.discountType === "%"
      ? offer.amount.toFixed(0) + "%"
      : offer.currencySymbol + offer.amount.toFixed(2)
  } Off`;

  return (
    <Card
      className={`${className} flex flex-col border-secondary-20 shadow-none`}
    >
      <div className="relative w-64 rounded-t-10">
        {offer.offerType === "offers" && discount && offer.amount > 0 ? (
          <div className="absolute -right-px top-0">
            <div className="flex-center relative">
              <Image
                src={"/icons/offer-discount-ribbon.svg"}
                alt="discount"
                height={50}
                width={25}
                className="w-10"
              />
              <div className="body-5-medium flex-center absolute top-2 w-min text-wrap text-center">
                {discount}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <Image
          src={offer?.imageFilePath || "/fyndr-placeholder-gray.svg"}
          alt="img/alt"
          width={200}
          height={100}
          className="aspect-[2/1] size-full rounded-t-[11px] object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-2">
        <div className="flex-between w-full items-center gap-2">
          <h3 className="body-3 line-clamp-1 text-black-60">{offer.title}</h3>
          {offer.isVoucher ? (
            <Image
              src={"/icons/voucher.svg"}
              alt="voucher"
              height={25}
              width={50}
              className="w-8"
            />
          ) : (
            <></>
          )}
        </div>
        <div className="body-4-medium flex items-center gap-1">
          <span className="text-black-60 line-through">
            {offer.currencySymbol}
            {offer.retailPrice.toFixed(2)}
          </span>
          <span className="text-primary">
            {offer.currencySymbol}
            {offer.offerPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default SeeMoreCard;
