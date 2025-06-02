import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getRemaining, parseDiscount, toTwoDecimalPlaces } from "@/lib/utils";
import { CampaignOfferProps } from "@/types/campaign";

type Props = {
  offer: CampaignOfferProps;
};

const OfferCard = ({ offer }: Props) => {
  return (
    <Card className="flex flex-col gap-4 border-none bg-primary-10 p-4 shadow-none lg:flex-row">
      <Image
        src={
          offer.imageFilePath
            ? offer.imageFilePath
            : "/images/fyndr-placeholder-gray.svg"
        }
        alt={offer.title}
        height={150}
        width={300}
        className="aspect-[2/1] w-full rounded-md lg:h-32 lg:w-64"
      />
      <div className="w-full">
        <CardHeader className="flex-between flex-row gap-2 space-y-0 p-0">
          <CardTitle className="text-secondary">{offer.title}</CardTitle>
          {offer.isVoucher && (
            <Image
              src={"/images/voucher-dark.svg"}
              alt="voucher"
              height={20}
              width={40}
            />
          )}
        </CardHeader>
        <CardContent className="mt-2 space-y-2 p-0">
          <div className="flex-between flex gap-2">
            <div className="flex gap-3">
              <p className="text-sm text-black-30 line-through">
                {offer.currencySymbol}
                {toTwoDecimalPlaces(offer.retailPrice)}
              </p>
              <p className="text-base font-medium text-primary">
                {offer.currencySymbol}
                {toTwoDecimalPlaces(offer.offerPrice)}
              </p>
            </div>
            <div className="body-semibold rounded bg-green-500 px-3 py-1 capitalize text-white">
              {parseDiscount(
                offer.amount,
                offer.discountType,
                offer.currencySymbol
              )}
            </div>
          </div>
          {offer?.offerLimit && (
            <div className="flex gap-2">
              <p>
                Offer Remaining:{" "}
                <span>{getRemaining(offer.offerLimit, offer.offerSold)}</span>
              </p>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <p>Qty: </p>
              <div className="flex items-center gap-2">
                <Button className="size-8 bg-secondary p-2">
                  <Minus />
                </Button>

                <Input
                  type="number"
                  className="hide-input-arrow w-14 bg-white outline-none"
                  min={0}
                />

                <Button className="size-8 bg-secondary p-2">
                  <Plus />
                </Button>
                {offer.usageLimit !== -1 && (
                  <div>Limit: {offer.usageLimit}</div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default OfferCard;
