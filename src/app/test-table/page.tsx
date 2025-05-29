import { createSearchParamsCache, parseAsInteger } from "nuqs/server";
import React from "react";

import { onGetUsers } from "@/actions/admin.actions";
import DefaultCard from "@/components/global/cards/default-card";
import { getSortingStateParser } from "@/lib/parsers";
import { AdminUserProps } from "@/types/api-response/user.response";
import { RouteParams } from "@/types/global";

import UserDetailsTable from "./_components/user-details-table";

const TestTable = async ({
  searchParams,
}: Pick<RouteParams, "searchParams">) => {
  const params = await searchParams;

  const searchParamsCache = createSearchParamsCache({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    sort: getSortingStateParser<AdminUserProps>().withDefault([
      { id: "createDt", desc: true },
    ]),
  });

  const search = searchParamsCache.parse(params);

  console.log({ search, params });

  const orderBy = search.sort.map((item) => (item.desc ? "DESC" : "ASC"));

  const promises = Promise.all([
    onGetUsers(
      {
        page: search?.page || 1,
        pageSize: search?.perPage || 10,
        dateOrder: params?.sort ? orderBy[0] : undefined,
      },
      {
        country: "US",
        endDate: "",
        promoCodeId: null,
        startDate: "",
        state: [],
        text: "",
        userStatus: [],
        userType: [],
      }
    ),
  ]);

  return (
    <div className="min-h-screen bg-light-700 p-4">
      <DefaultCard>
        <h1 className="h2-semibold">Table example</h1>
        <section className="mt-10">
          <UserDetailsTable promises={promises} />
        </section>
      </DefaultCard>
    </div>
  );
};

export default TestTable;
