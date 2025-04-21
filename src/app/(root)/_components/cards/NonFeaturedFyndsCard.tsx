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
    <Card className="relative w-full cursor-pointer rounded-md border-light-800 p-0 shadow-none transition duration-500 hover:scale-105 sm:max-w-80">
      <Image
        src={imageURL || "/images/grayPlaceholderFyn.png"}
        alt={`${title}: Book on Fyndr now!`}
        width={600}
        height={300}
        className="aspect-[2/1] rounded-t-md object-cover"
      />
      <div className="min-h-48 space-y-4 rounded-b-md bg-primary-100 p-4">
        <CardTitle>{bizName}</CardTitle>
        <CardDescription className="body-regular">
          <h4 className="paragraph-regular line-clamp-2 h-11 text-dark-100">
            {title}
          </h4>
          <p className="line-clamp-2 h-10 text-light-300">{address}</p>
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
