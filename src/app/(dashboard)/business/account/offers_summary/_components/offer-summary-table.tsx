"use client";

import React from "react";
import { DataTable } from "@/components/global/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { getOfferSummaryDetailsColoumn } from "./offer-summary-details-coloumn";
import { useUser } from "@/hooks/auth";
import { DataTableRowAction } from "@/types/data-table";
import { onGetOfferSummary } from "@/actions/offersummary.actions";
import { useSearchParams } from "next/navigation";
import ActionsDialog from "../../../../_components/redeemptionModal/actions-dialog";



type Props = {
  promises: Promise<[Awaited<ReturnType<typeof onGetOfferSummary>>]>;
};

const OfferSummaryTable = ({ promises }: Props) => {
  const searchParams = useSearchParams();
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const [{ data, success, error }] = React.use(promises);

  const { user } = useUser();
  const userTimeZone = user?.userTimeZone;

  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<OfferPurchaseProps> | null>(null);

  const columns = React.useMemo(
    () => getOfferSummaryDetailsColoumn({ setRowAction, userTimeZone }),
    [userTimeZone]
  );

  if (!success || !data) return <div>Error</div>;

  const { count,  listOfferPurchasedOutDTO } = data.data;

  const { table } = useDataTable({
    data:  listOfferPurchasedOutDTO || [],
    columns,
    pageCount: Math.ceil(count / pageSize),
    getRowId: (row) => `${row.objid}`,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      
      <DataTable table={table} />
      {/* If you have a dialog like ActionsDialog, you can include it here */}
      <ActionsDialog
        open={rowAction?.variant === "update"}
        onOpenChange={() => setRowAction(null)}
        row = {rowAction?.row.original ?? null}
      />
    </>
  );
};

export default OfferSummaryTable;
