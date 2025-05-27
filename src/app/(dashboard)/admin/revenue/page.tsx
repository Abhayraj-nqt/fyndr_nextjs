import { getReveue } from "@/actions/admin.actions";
import { RouteParams } from "@/types/global";
import { createSearchParamsCache, parseAsInteger } from "nuqs/server";
import React from "react";
import RevenueTable from "./_components/revenueTable";

const Revenue = async ({ searchParams }: Pick<RouteParams, "searchParams">) => {
  const params = await searchParams;

  const searchParamsCache = createSearchParamsCache({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
  });
  const search = searchParamsCache.parse(params);

  const data = Promise.all([
    getReveue({
      pgStart: search?.page || 1,
      pgSize: search?.perPage || 10,
    },{
        businessName:"",
        country:"US",

    }),
  ]);
  return <div>
    <RevenueTable promises={data} />
  </div>;
};

export default Revenue;
