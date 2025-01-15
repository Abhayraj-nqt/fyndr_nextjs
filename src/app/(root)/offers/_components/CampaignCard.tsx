import Image from "next/image";
import React from "react";

import { Card } from "@/components/ui/card";

const SeeCampaignCard = () => {
  return (
    <Card>
      <Image src={"/img/offer"} alt={"/img/offer"} />
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
    <Card className="">
      <div className="flex-between">
        <h1>Baby Food</h1>
        <Image
          src={"/icons/featured"}
          alt="featured"
          width={50}
          height={50}
          className=""
        />
      </div>

      <div className="">
        <Image src={"img/src"} alt="img/alt" width={100} height={50} />
        <div className="">
          <h2>All The Best</h2>
          <p>2060, phoenix, phoenix, Phoenix, AZ 85001 (0 miles)</p>
          <div className="">
            <Image
              src={"/icons/phone"}
              alt="/icons/phone"
              width={50}
              height={50}
              className=""
            />
            <Image
              src={"/icons/website"}
              alt="/icons/website"
              width={50}
              height={50}
              className=""
            />
            <Image
              src={"/icons/share"}
              alt="/icons/share"
              width={50}
              height={50}
              className=""
            />
            <div className="">
              <Image
                src={"/icons/wishlist"}
                alt="/icons/wishlist"
                width={50}
                height={50}
                className=""
              />
              <p>count 1</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-between">
        <div className="">Coupons: 1</div>
        <div className="">See more</div>
      </div>

      <SeeCampaignCard />
    </Card>
  );
};

export default CampaignCard;
