"use client";

import { getReveue } from "@/actions/admin.actions";
import { DataTableRowAction } from "@/types/data-table";
import { useSearchParams } from "next/navigation";
import React from "react";
import getRevenueColumn from "./getRevenueColumn";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/global/data-table/data-table";
type Props = {
  promises: Promise<[Awaited<ReturnType<typeof getReveue>>]>;
};
const RevenueTable = ({ promises }: Props) => {
  const searchParams = useSearchParams();
  const [{ data, success, error }] = React.use(promises);

  const pgSize = Number(searchParams.get("pageSize")) || 10;
  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<RevenueResponse> | null>(null);
  const columns = React.useMemo(() => getRevenueColumn({ setRowAction }), []);

  if(!success || !data) return <div>No data available</div>
  const {count, revenueDetails} = data.data

  const {table}= useDataTable({
    data: revenueDetails || [],
    columns,
    pageCount: Math.floor(count / pgSize),
    getRowId: (originalRow) => `${originalRow.objId}`,
    shallow: false,
    clearOnDefault: true,
  })
  return <div>
    <DataTable table={table} />
  </div>;
};

export default RevenueTable;
