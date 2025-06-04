import DateComponent from "@/components/global/date-component";
import { Pagination } from "@/components/ui/pagination";
import React from "react";
import { ExpiredPromo } from "@/types/api-response/promocode.response";

type Props = {
  data: ExpiredPromo[] | undefined;
};

const Expiredpromos = ({ data }: Props) => {
  return (
    <div>
      {data?.map((promo, key) => (
        <div
          key={key}
          className="mt-5 flex w-full rounded-10 border border-secondary-20"
        >
          <div>
            <img
              src={promo.imageUrl}
              className="w-[77.3134px] h-[77.3134px] rounded-[10px]"
              alt="Promo"
            />
          </div>
          <div className="flex flex-col justify-evenly w-full pt-1 px-4">
            <p className="text-sm text-[#257cdb]">{promo.promoCode}</p>
            <div className="flex flex-row justify-between">
              <p className="text-sm">
                Expired on: <DateComponent date={promo.endDate} />
              </p>
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

