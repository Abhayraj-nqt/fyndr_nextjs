import Image from "next/image";
import React from "react";

import { Card, CardDescription, CardFooter, CardTitle } from "../ui/card";

const NonFeaturedFyndsCard = () => {
  return (
    <Card className="max-w-80 cursor-pointer rounded-md p-0 transition duration-500 hover:scale-105">
      <Image
        src={
          "https://s3.us-west-1.amazonaws.com/dev.fyndr.us/public/biz-campaign/us/images/main/1000139-3cf00f6d-1af9-475e-97be-0fbb91a6bb9f-0.png"
        }
        alt="catalogue"
        width={500}
        height={500}
        className="rounded-t-md object-cover"
      />
      <div className="space-y-4 bg-primary-100 p-4">
        <CardTitle>ArtRaft Gallery 1</CardTitle>
        <CardDescription className="body-regular text-light-300">
          <p>Test Coupons</p>
          <p>
            2.2 miles, 4750 E Union Hills Drive Phoenix AZ - 85050, phoenix,
            Phoenix, AZ 85050
          </p>
        </CardDescription>
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
      </div>
    </Card>
  );
};

export default NonFeaturedFyndsCard;
