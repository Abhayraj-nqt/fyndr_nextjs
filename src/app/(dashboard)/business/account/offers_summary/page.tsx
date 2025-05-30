import { createSearchParamsCache, parseAsInteger } from "nuqs/server";
import React from "react";

import { onGetOfferSummary } from "@/actions/offersummary.actions";
import { auth } from "@/auth";
import ContainerWrapper from "@/components/global/ContainerWrapper";
import PieChartSection from "@/components/global/piechart/piechart";
import { RouteParams } from "@/types/global";

import OfferSummaryTable from "./_components/offer-summary-table";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const OfferSummary = async ({
  searchParams,
}: Pick<RouteParams, "searchParams">) => {
  const session = await auth();
  const bizid = session?.user?.bizid;

  const params = await searchParams;

  // Parse search parameters
  const searchParamsCache = createSearchParamsCache({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
  });

  const search = searchParamsCache.parse(params);

  console.log("Current page:", search.page);
  console.log("Page size:", search.pageSize);

  // Make API call with current page parameters
  const { success, data } = await onGetOfferSummary({
    bizid,
    pgSize: search.pageSize,
    pgStart: search.page, // This should change with pagination
  });

  if (!success || !data) {
    return <div>Error loading data</div>;
  }

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
      <div className="flex justify-between gap-4 pb-6 pt-1 text-[14px] font-normal md:flex-row">
        <div className="flex">
          <div className="mr-6 flex items-center justify-center rounded-[10px] bg-[#F4F8FD] p-6 shadow-[0px_4px_4px_0px_#0000001A]">
            <PieChartSection chartData={chartData} />
          </div>

          <div className="flex flex-col justify-end gap-2 text-[16px] leading-5 text-[#878787]">
            <p>Total Offers Sold: {data?.data.purchasedOffersCount}</p>
            <p>Total Unused Offers: {data?.data.unredeemedOffersCount}</p>
            <p>Total Redeemed Offers: {data.data?.redeemedOffersCount}</p>
            <p>
              Total Partially Redeemed Offers:{" "}
              {data?.data.partiallyRedeemedOffersCount}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-end gap-2 pr-20">
          <div className="flex items-center">
            <span className="mr-2 inline-block size-4 rounded-full bg-current text-[#5196E2]"></span>
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
        <OfferSummaryTable
          data={data?.data?.listOfferPurchasedOutDTO || []}
          count={data?.data?.count || 0}
          currentPage={search.page}
          pageSize={search.pageSize}
        />
      </section>
    </ContainerWrapper>
  );
};

export default OfferSummary;
