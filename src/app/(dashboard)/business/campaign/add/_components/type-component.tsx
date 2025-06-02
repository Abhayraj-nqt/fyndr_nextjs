import React from "react";

import Button from "@/components/global/buttons";
import DefaultCard from "@/components/global/cards/default-card";
import { capitalize } from "@/lib/utils";

import CouponBtnIcon from "../../../../../../components/icons/coupon-btn-Icon";
import EventBtnIcon from "../../../../../../components/icons/event-btn-Icon";
import OfferBtnIcon from "../../../../../../components/icons/offer-btn-Icon";

const TypeComponent = () => {
  const cmpnTypes = ["offers", "events", "coupons"];
  return (
    <DefaultCard className="flex-center m-4 min-h-[134px] w-full max-w-[497px] flex-col rounded-2 border-solid bg-white p-2 outline-black">
      <div className="flex flex-row gap-6">
        {cmpnTypes.map((item, index) => (
          <Button
            key={index}
            className="h-[46px] w-[131px] border border-[#d3d6e1] bg-white p-[10px] text-gray-400 hover:bg-white"
          >
            {capitalize(item) === "Offers" ? (
              <OfferBtnIcon
              // color={payload.cmpnType === item ? "#257CDB" : undefined}
              />
            ) : capitalize(item) === "Events" ? (
              <EventBtnIcon
              // color={payload.cmpnType === item ? "#257CDB" : undefined}
              />
            ) : capitalize(item) === "Coupons" ? (
              <CouponBtnIcon
              // color={payload.cmpnType === item ? "#257CDB" : undefined}
              />
            ) : (
              ""
            )}{" "}
            {capitalize(item)}
          </Button>
        ))}
      </div>
    </DefaultCard>
  );
};

export default TypeComponent;
