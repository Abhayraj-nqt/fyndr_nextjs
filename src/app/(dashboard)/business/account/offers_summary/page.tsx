import React from "react";

import { onGetOfferSummary } from "@/actions/offersummary.actions";
import { auth } from "@/auth";
import ContainerWrapper from "@/components/global/ContainerWrapper";


import OfferSummaryTable from "./_components/offer-summary-table";
import PieChartSection from "@/components/global/piechart/piechart";

const OfferSummary = async () => {
  const session = await auth();
  const bizid = session?.user?.bizid;



  const pgSize = 10;

  const { success, data } = await onGetOfferSummary({
    bizid,
    pgSize,
    pgStart: 1,
  });

  if (!success || !data) return null;

  const chartData = [
    { name: "Unused", visitors: data?.data.unredeemedOffersCount || 0 },
    { name: "Redeemed", visitors: data.data?.redeemedOffersCount || 0 },
    {
      name: "Partially Redeemed",
      visitors: data?.data.partiallyRedeemedOffersCount || 0,
    },
  ];

  return (
    <ContainerWrapper title="Offer Summary">
      <div className="flex justify-between gap-4 pb-6 pt-1 text-[14px] font-normal md:flex-row ">
        <div className="flex">
          <div className="mr-6 flex items-center justify-center rounded-[10px] bg-[#F4F8FD] p-6 shadow-[0px_4px_4px_0px_#0000001A]">
            <PieChartSection chartData={chartData} />
          </div>

          <div className=" flex flex-col justify-end gap-2 text-[16px] leading-5 text-[#878787]">
            <p>Total Offers Sold: {data?.data.purchasedOffersCount} </p>
            <p>Total Unused Offers: {data?.data.unredeemedOffersCount} </p>
            <p>Total Redeemed Offers: { data.data?.redeemedOffersCount} </p>
            <p>Total Partially Redeemed Offers: {data?.data.partiallyRedeemedOffersCount} </p>
          </div>
        </div>

        <div className="flex flex-col justify-end gap-2 pr-20">
          <div className="flex items-center">
            <span className="mr-2 inline-block size-4 rounded-full bg-current  text-[#5196E2]"></span>
            <span>Offers Unused</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 inline-block size-4 rounded-full bg-current text-[#999999]"></span>
            <span>Offers Redeemed</span>
          </div>

          <div className="flex items-center">
            <span className="mr-2 inline-block size-4 rounded-full bg-current text-[#EAF2FC]"></span>
            <span>Offers Partially Redeemed</span>
          </div>
        </div>

       
      </div>
       <section className="mt-10">
          <OfferSummaryTable data={data?.data?.listOfferPurchasedOutDTO} count ={data?.data?.count} pageSize = {pgSize} />
        </section>
    </ContainerWrapper>
  );
};

export default OfferSummary;
