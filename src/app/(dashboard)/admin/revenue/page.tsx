import { getReveue } from "@/actions/admin.actions";
import { RouteParams } from "@/types/global";
import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";
import React from "react";
import RevenueTable from "./_components/revenueTable";
import RevenueHeader from "./_components/revenueHeader";

const Revenue = async ({ searchParams }: Pick<RouteParams, "searchParams">) => {
  const params = await searchParams;
   const cache = createSearchParamsCache({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    query: parseAsString.withDefault(""),
    country: parseAsString.withDefault(""),
    startDate: parseAsString.withDefault(""),
    endDate: parseAsString.withDefault(""),
  });

  const {
    page,
    perPage,
    query,
    country,
    startDate,
    endDate,
  } = await cache.parse(searchParams);

  

  const data = Promise.all([
    getReveue({ pgStart: page, pgSize: perPage },{
        businessName:query,
        country:country,
        startDate:startDate,
        endDate:endDate,

    }),
  ]);
  return <div className="p-10">
    <div>
      <RevenueHeader />
    </div>
    <div className="bg-white">
    <RevenueTable promises={data} />
    </div>
  </div>;
};

export default Revenue;
