import Image from "next/image";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const FeatureFyndsCard = () => {
  return (
    <Card className="max-w-80 cursor-pointer space-y-4 p-4 transition duration-500 hover:scale-105">
      <CardHeader className="flex-between flex-row space-y-0 p-0">
        <CardTitle>ArtRaft Gallery 1</CardTitle>
        <Image
          src={"/icons/crown.svg"}
          height={30}
          width={30}
          alt="crown-img"
          className="m-0"
        />
      </CardHeader>
      <CardContent className="space-y-6 p-0">
        <Image
          src={
            "https://s3.us-west-1.amazonaws.com/dev.fyndr.us/public/biz-campaign/us/images/main/1000123-1e618c51-d76d-41d8-9c2f-8c84538f90c3-0.png"
          }
          alt="catalogue"
          width={500}
          height={500}
          className="rounded-md object-cover"
        />
        <div className="flex-between">
          <p>Soft Cola Drink</p>
          <div className="flex-center relative flex">
            <Image
              src={"/icons/chips.svg"}
              width={80}
              height={20}
              alt="offer-tag"
            />
            <p className="absolute text-primary-500">offers</p>
          </div>
        </div>
        <CardDescription className="body-regular text-light-300">
          2.2 miles, 4750 E Union Hills Drive Phoenix AZ - 85050, phoenix,
          Phoenix, AZ 85050
        </CardDescription>
      </CardContent>
      <CardFooter className="flex-between flex p-0">
        <div className="flex gap-1">
          <div className="small-regular text-light-400 line-through">
            $900.00
          </div>
          <div className="text-primary-500">$810.000</div>
        </div>
        <div className="paragraph-semibold rounded bg-green-500 px-3 py-1 capitalize text-light-900">
          10% OFF
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeatureFyndsCard;
