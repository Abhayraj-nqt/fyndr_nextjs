import { getCapaignDetails } from "@/actions/admin.actions";
import { getSortingStateParser } from "@/lib/utils/table/parsers";
import {
  CampaignDetail,
} from "@/types/api-response/adminCampaign.response";
import { RouteParams } from "@/types/global";
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server";
import React from "react";
import CampaignsTable from "./_components/campaignsTable";
import CampaignsHeader from "./_components/campaignsHeader";

const Campaigns = async ({
  searchParams,
}: Pick<RouteParams, "searchParams">) => {
   const cache = createSearchParamsCache({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    sort: getSortingStateParser<CampaignDetail>().withDefault([
      { id: 'endDate', desc: true },
    ]),
    query: parseAsString.withDefault(''),
    country: parseAsString.withDefault(''),
    status: parseAsArrayOf(parseAsString).withDefault([]),
    campaignType: parseAsArrayOf(parseAsString).withDefault([]),
    startDate: parseAsString.withDefault(''),
    endDate: parseAsString.withDefault(''),
  });

  const parsedParams = await  cache.parse(searchParams);

  const data = await getCapaignDetails(
    {
        pgStart : parsedParams?.page || 1,
      pgSize: parsedParams?.perPage || 10,
    },
    {
      businessName: parsedParams.query,
      country: parsedParams.country,
      status: parsedParams.status.map((s) => s.toUpperCase()),
      campaignType: parsedParams.campaignType?.map((type) =>
        type.toLowerCase()
      ),
      startDate: parsedParams.startDate,
      endDate: parsedParams.endDate,
    }
  );
  return (
    
    <div className="p-6">
      <div>
      <CampaignsHeader data = {data} />
      </div>
        <CampaignsTable data={data} />
    </div>
  );
};

export default Campaigns;
