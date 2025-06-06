/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";

import { onDisputeList } from "@/actions/dispute.action";
import { DataTable } from "@/components/global/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { DisputeDetailsProps } from "@/types/api-response/dispute.response";
import { DataTableRowAction } from "@/types/data-table";

import getDisputeListColumn from "./dispute-list-details-coloumn";
import DisputeReasion from "./dispute-reasion";
import DisputeRefund from "./dispute-refund";

type Props = {
  promises: Promise<[Awaited<ReturnType<typeof onDisputeList>>]>;
};

const DisputeListTable = ({ promises }: Props) => {
  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<DisputeDetailsProps> | null>(null);

  const [{ data, success }] = React.use(promises);
  //   const columns = React.useMemo(() => getDisputeListColumn(), []);

  const columns = React.useMemo(
    () => getDisputeListColumn({ setRowAction }),
    []
  );

  if (!success || !data) return <div>Error</div>;

  const { count, disputeDetails } = data;

  const { table } = useDataTable({
    data: disputeDetails || [],
    columns,
    pageCount: Math.floor(count / 10),
    getRowId: (row) => `${row?.disputeId}`,
  });

  return (
    <>
      <DataTable table={table} />
      <DisputeReasion
        open={rowAction?.variant === "update"}
        onOpenChange={() => setRowAction(null)}
        row={rowAction?.row.original ?? null}
      />
      <DisputeRefund
        open={rowAction?.variant === "refund"}
        onOpenChange={() => setRowAction(null)}
        row={rowAction?.row.original ?? null}
      />
    </>
  );
};

export default DisputeListTable;
