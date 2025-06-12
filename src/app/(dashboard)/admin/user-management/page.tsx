import { getAllUsers } from "@/actions/admin.actions";
import { RouteParams } from "@/types/global";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";
import React from "react";
import UserManagementTable from "./_components/user-management-table";
import UserManagementHeader from "./_components/user-management-header";

const UserManagement = async ({
  searchParams,
}: Pick<RouteParams, "searchParams">) => {
  const cache = createSearchParamsCache({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    query: parseAsString.withDefault(""),
    customerRole: parseAsArrayOf(parseAsString).withDefault([]),
  });

  const parsedParams = await cache.parse(searchParams);

  const data = await getAllUsers(
    {
      page: parsedParams.page || 1,
      pageSize: parsedParams.perPage,
    },
    {
      userRoles: parsedParams.customerRole,
      text: parsedParams.query,
    }
  );
  return (
    <div className='p-8 flex flex-col gap-6'>
      <UserManagementHeader />
      <UserManagementTable data={data} />
    </div>
  );
};

export default UserManagement;
