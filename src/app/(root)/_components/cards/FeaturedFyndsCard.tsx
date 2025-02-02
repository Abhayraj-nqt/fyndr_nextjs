import Image from "next/image";
import React from "react";

import { AspectRatio } from "../ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  bizName: string;
  address: string;
  imageURL: string;
  title: string;
  cmpnType: string;
  retailPrice: number;
  offerPrice: number;
  currencySymbol: string;
  discountType: string;
  discount: number;
}

const FeatureFyndsCard = ({
  address,
  bizName,
  cmpnType,
  currencySymbol,
  discount,
  discountType,
  imageURL,
  offerPrice,
  retailPrice,
  title,
}: Props) => {
  return (
    <Card className="relative min-h-[25rem] w-full cursor-pointer space-y-4 p-4 transition duration-500 hover:scale-105 sm:max-w-80">
      <CardHeader className="flex-between flex-row gap-2 space-y-0 p-0">
        <CardTitle>{bizName}</CardTitle>
        <Image
          src={"/icons/crown.svg"}
          height={30}
          width={30}
          alt="crown-img"
          className="m-0"
        />
      </CardHeader>
      <CardContent className="space-y-6 p-0">
        <div className="relative w-full ">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={imageURL}
              alt={`${title}: Book now on Fyndr`}
              // width={500}
              // height={500}
              fill
              sizes="(max-width: 320px) 100vw"
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        <div className="flex-between h-11 gap-2">
          <h4 className="paragraph-regular line-clamp-2">{title}</h4>
          <div className="flex-center relative flex min-w-20">
            <Image
              src={"/icons/chips.svg"}
              width={80}
              height={20}
              alt="offer-tag"
            />
            <p className="absolute text-primary-500">{cmpnType}</p>
          </div>
        </div>
        <CardDescription className="body-regular line-clamp-2 h-10 text-light-300">
          {address}
        </CardDescription>
      </CardContent>
      <CardFooter className="items-end justify-between p-0">
        <div className="flex flex-col gap-1">
          <div className="small-regular text-light-400 line-through">
            {currencySymbol}
            {retailPrice?.toFixed(2)}
          </div>
          <div className="paragraph-semibold text-primary-500">
            {currencySymbol}
            {offerPrice?.toFixed(2)}
          </div>
        </div>
        {discountType === "%" && discount > 0 && (
          <div className="body-semibold rounded bg-green-500 px-3 py-1 capitalize text-light-900">
            {discount}% OFF
          </div>
        )}
        {discountType === "flat" && discount > 0 && (
          <div className="body-semibold rounded bg-green-500 px-3 py-1 capitalize text-light-900">
            {currencySymbol}
            {discount?.toFixed(2)} OFF
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default FeatureFyndsCard;
