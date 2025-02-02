import { Phone, Globe, Share2, Heart } from "lucide-react";
import Image from "next/image";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SeeCampaignCard = () => {
  return (
    <Card>
      <Image
        src={
          "https://s3.us-west-1.amazonaws.com/dev.fyndr.us/public/biz-campaign/us/images/main/1000123-1e618c51-d76d-41d8-9c2f-8c84538f90c3-0.png"
        }
        alt={"/img/offer"}
        height={50}
        width={100}
      />
      <h3>Test offer </h3>
      <div className="">
        <span className="line-through">$234.00</span>
        <span className="text-primary-500">$227.00</span>
      </div>
    </Card>
  );
};

const CampaignCard = () => {
  return (
    <Card className="max-w-xl space-y-4 rounded-lg border-none p-4 shadow-none">
      <CardHeader className="flex-between flex-row space-y-0 p-0">
        <CardTitle>Baby Food</CardTitle>
        <Image
          src={"/images/featured.png"}
          alt="featured"
          width={120}
          height={50}
          className=""
        />
      </CardHeader>
      <CardContent className="flex gap-4 p-0">
        <Image
          src={
            "https://s3.us-west-1.amazonaws.com/dev.fyndr.us/public/biz-campaign/us/images/main/1000123-1e618c51-d76d-41d8-9c2f-8c84538f90c3-0.png"
          }
          alt="img/alt"
          width={200}
          height={100}
          className="aspect-video rounded-md"
        />
        <div className="space-y-4">
          <CardTitle>All The Best</CardTitle>
          <CardDescription className="body-regular text-light-300">
            2060, phoenix, phoenix, Phoenix, AZ 85001 (0 miles)
          </CardDescription>
          <div className="flex items-center gap-4">
            <Phone size={20} />
            <Globe size={20} />
            <Share2 size={20} />
            <div className="flex items-center justify-center gap-2">
              <Heart size={20} />
              <p>1</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-between p-0">
        <div className="">Coupons: 1</div>
        <div className="">See more</div>
      </CardFooter>

      {/* <SeeCampaignCard /> */}
    </Card>
  );
};

export default CampaignCard;
