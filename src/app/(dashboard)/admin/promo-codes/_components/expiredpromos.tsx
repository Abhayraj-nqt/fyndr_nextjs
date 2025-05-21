import DateComponent from "@/components/global/date-component";
import { Pagination } from "@/components/ui/pagination";
import { ExpiredPromo } from "@/types/api-response/promocode.response";
import React from "react";
type Props = {
  data: ExpiredPromo[] | undefined;
};
const Expiredpromos = ({ data }: Props) => {
  return (
    <div>
      {data?.map((promo, key) => (
        <div
          key={key}
          className="w-full border border-[#d3d6e1] rounded-[10px] mt-5 flex"
        >
          <div>
            <img src={promo.imageUrl} className="w-[77.3134px] h-[77.3134px] rounded-[10px]" />
          </div>
          <div className="flex flex-col justify-evenly w-full pt-1 pl-4 pr-4">
          <div>
          <p className="text-sm" style={{ color: "#257cdb" }}>{promo.promoCode}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-sm">Expired on: <DateComponent date={promo.endDate}/> </p>
            <p className="text-sm">Registrations: {promo.userRegistered}</p>
          </div>
          </div>
        </div>
      ))}
      <Pagination />
    </div>
  );
};

export default Expiredpromos;
