import { getActivePromos, getExpiredPromos } from "@/actions/admin.actions";
import ContainerWrapper from "@/components/global/ContainerWrapper";
import LocalSearch from "@/components/global/search/local-search";

import { Input } from "@/components/ui/input";
import React from "react";
import ActiveBar from "./_components/activeBar";
import Expiredpromos from "./_components/expiredpromos";

const PromoCodes = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search =
    typeof searchParams?.query === "string" ? searchParams.query : "";
  const { success: activeSuccess, data: activeData } = await getActivePromos({
    search,
  });
  const { success: expiredSuccess, data: expiredData } = await getExpiredPromos(
    { search, pgStart: 1, pgSize: 10 }
  );
  console.log("promo data expired", expiredData, expiredSuccess);

  return (
    <ContainerWrapper title="Promo codes">
      <div className="flex justify-between">
        <span className="text-lg font-medium py-4">Active Promo Codes</span>
        <div>
          <LocalSearch placeholder="Search" route="/admin/promo-codes" />
        </div>
      </div>

      <div className="w-full relative">
      
        <ActiveBar data={activeData} />
      </div>

      <div className="pl-4 mt-4">
      <p className="text-lg font-medium">History</p>
        <Expiredpromos data={expiredData?.promocodesList } />
      </div>
    </ContainerWrapper>
  );
};

export default PromoCodes;
