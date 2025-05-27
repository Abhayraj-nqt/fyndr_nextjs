import { getReviewReport } from '@/actions/admin.actions';
import { RouteParams } from '@/types/global'
import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server';
import React from 'react'
import ReportsTable from './_components/reportsTable';

const ReviewReport = async ({
  searchParams,
}: Pick<RouteParams, "searchParams">) => {
    const params = await searchParams;
    const orderByParser = parseAsString.withDefault("ASC")
    const searchParamsCache = createSearchParamsCache({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    orderBy: orderByParser
  });
  const search = searchParamsCache.parse(params)


  const data = Promise.all([
    getReviewReport(
        {
            pgSize: search?.perPage || 10,
            pgStart: search?.page || 1,
            orderBy: search.orderBy || "ASC",
        }
    )
  ])
  return (
    <div>
        <ReportsTable promises={data} />
    </div>
  )
}

export default ReviewReport