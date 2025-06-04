import { onGetUsers } from "@/actions/admin.actions";
import UserDetailsTable from "./_components/user-details-table";
import ContainerWrapper from "@/components/global/ContainerWrapper";
import { getSortingStateParser } from "@/lib/utils/table/parsers";
import { createSearchParamsCache, parseAsInteger, parseAsString, parseAsArrayOf } from "nuqs/server";
import { AdminUserProps } from "@/types/api-response/user.response";
import { RouteParams } from "@/types/global";
import React from "react";
import { SearchHeader } from "./_components/searchHeader";

const UserDetais = async ({
  searchParams,
}: Pick<RouteParams, "searchParams">) => {
  const params = await searchParams;

  const searchParamsCache = createSearchParamsCache({
    query: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    sort: getSortingStateParser<AdminUserProps>().withDefault([
      { id: "createDt", desc: true },
    ]),
    startDate: parseAsString.withDefault(''),
    endDate: parseAsString.withDefault(''),
    country: parseAsString.withDefault(""),
    state: parseAsArrayOf(parseAsString).withDefault([]),
    promoCode: parseAsString.withDefault(''),
    status: parseAsArrayOf(parseAsString).withDefault([]),
    customer: parseAsArrayOf(parseAsString).withDefault([]),
    channel: parseAsArrayOf(parseAsInteger).withDefault([]),
  });

  const search = searchParamsCache.parse(params);

  const orderBy = search.sort.map((item) => (item.desc ? "DESC" : "ASC"));

  const country = search.country;
  const state = search.state;
  const promoCodeId = search.promoCode ? Number(search.promoCode) : null;
  const userStatus = search.status;
  const userType = search.customer;
  const findUsOptions = search.channel;
  const startDate = search.startDate || "";
  const endDate = search.endDate || "";

 

  const dataResponse = await onGetUsers(
    {
      page: search?.page || 1,
      pageSize: search?.perPage || 10,
      dateOrder: params?.sort ? orderBy[0] : undefined,
    },
    {
      country,
      state,
      text: search.query,
      promoCodeId,
      startDate,
      endDate,
      userStatus,
      userType,
      findUsOptions,
    }
  );

  return (
    <ContainerWrapper>
      <SearchHeader userCount={dataResponse.data?.data.count ?? 0} />
      <section>
        <UserDetailsTable dataResponse={dataResponse} />
      </section>
    </ContainerWrapper>
  );
};

export default UserDetais;