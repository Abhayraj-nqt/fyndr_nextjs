import Image from "next/image";
import React from "react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../../../../components/ui/card";

type Props = {
  imageURL: string;
  title: string;
  bizName: string;
  address: string;
  discount: number;
  retailPrice: number;
  offerPrice: number;
  currencySymbol: string;
  discountType: string;
};

const NonFeaturedFyndsCard = ({
  imageURL,
  title,
  address,
  bizName,
  currencySymbol,
  discount,
  offerPrice,
  retailPrice,
  discountType,
}: Props) => {
  return (
    <Card className="max-w-80 cursor-pointer rounded-md p-0 transition duration-500 hover:scale-105">
      <Image
        src={imageURL || "/images/grayPlaceholderFyn.png"}
        alt={`${title}: Book on Fyndr now!`}
        width={500}
        height={500}
        className="rounded-t-md object-cover"
      />
      <div className="space-y-4 bg-primary-100 p-4">
        <CardTitle>{bizName}</CardTitle>
        <CardDescription className="body-regular text-light-300">
          <p>{title}</p>
          <p>{address}</p>
        </CardDescription>
        <CardFooter className="flex-between flex p-0">
          <div className="flex gap-1">
            <div className="small-regular text-light-400 line-through">
              {currencySymbol}
              {retailPrice?.toFixed(2)}
            </div>
            <div className="text-primary-500">
              {currencySymbol}
              {offerPrice?.toFixed(2)}
            </div>
          </div>
          {discountType === "%" && discount > 0 && (
            <div className="paragraph-semibold rounded bg-green-500 px-3 py-1 capitalize text-light-900">
              10% OFF
            </div>
          )}
          {discountType === "flat" && discount > 0 && (
            <div className="paragraph-semibold rounded bg-green-500 px-3 py-1 capitalize text-light-900">
              10% OFF
            </div>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};

export default NonFeaturedFyndsCard;
