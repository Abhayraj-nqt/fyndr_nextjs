"use client";

import { getReviewReport } from "@/actions/admin.actions";
import { DataTableRowAction } from "@/types/data-table";
import { useSearchParams } from "next/navigation";
import React from "react";
import getReportsColumns from "./getReportsColumns";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/global/data-table/data-table";

type Props = {
  promises: Promise<[Awaited<ReturnType<typeof getReviewReport>>]>;
};
const ReportsTable = ({ promises }: Props) => {
  const searchParams = useSearchParams();

  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const [{ data, success, error }] = React.use(promises);

  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<ReportCommentDetail> | null>(null);

  const columns = React.useMemo(() => getReportsColumns({ setRowAction }), []);
   if (!success || !data) return <div>Error</div>;

   const {count, reportCommentDetails} = data;

   const {table}= useDataTable({
    data: reportCommentDetails || [],
    columns,
    pageCount: Math.floor(count/pageSize),
    getRowId: (originalRow) => `${originalRow.commentId}`,
    shallow: false,
    clearOnDefault: true,
   })

  if (!success || !data) return <div>Error</div>;
  return <div>
    <DataTable table={table} />
  </div>;
};

export default ReportsTable;
