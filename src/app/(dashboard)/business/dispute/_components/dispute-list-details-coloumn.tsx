import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React from "react";

import { DataTableColumnHeader } from "@/components/global/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { DisputeDetailsProps } from "@/types/api-response/dispute.response";
import { DataTableRowAction } from "@/types/data-table";

dayjs.extend(utc);
dayjs.extend(timezone);
type Props = {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<DisputeDetailsProps> | null>
  >;
};

// export function getDisputeListColumn(): ColumnDef<DisputeDetailsProps>[] {
export function getDisputeListColumn({
  setRowAction,
}: Props): ColumnDef<DisputeDetailsProps>[] {
  return [
    {
      id: "invoiceId",
      accessorKey: "invoiceId",

      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Invoice ID" />
      ),
      cell: ({ row }) => <div>{row.getValue("invoiceId")}</div>,
      enableSorting: false,
    },
    {
      id: "disputeId",
      accessorKey: "disputeId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dispute ID" />
      ),
      cell: ({ row }) => <div>{row.getValue("disputeId")}</div>,
      enableSorting: false,
    },
    {
      id: "buyerEmail",
      accessorKey: "buyerEmail",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Client Email" />
      ),
      cell: ({ row }) => <div>{row.getValue("buyerEmail")}</div>,
      enableSorting: false,
    },
    {
      id: "disputeReason",
      accessorKey: "disputeReason",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dispute Reason" />
      ),
      cell: ({ row }) => (
        <div>
          {" "}
          <div
            onClick={() => setRowAction({ row, variant: "update" })}
            className="cursor-pointer text-primary"
          >
            View
          </div>
        </div>
      ),
      enableSorting: false,
    },
    {
      id: "amount",
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => <div>{row.getValue("amount")}</div>,
      enableSorting: false,
    },
    {
      id: "disputeStatus",
      accessorKey: "disputeStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),

      // cell: (row) => (
      //   <div>
      //     <div>
      //       <Button
      //         className="mb-5 bg-primary"
      //         onClick={() => setRowAction({ row, variant: "update" })}
      //       >
      //       Refund
      //       </Button>
      //       <Button className="bg-primary">comments</Button>
      //     </div>
      //     {/* {row.getValue("disputeStatus")} */}
      //   </div>
      // ),

      cell: ({ row }) => (
        <div>
          {" "}
          <Button
            onClick={() => setRowAction({ row, variant: "refund" })}
            className="cursor-pointer text-primary"
          >
            Refund
          </Button>
          <Button className="bg-primary">comments</Button>
        </div>
      ),

      enableSorting: false,
    },
  ];
}

export default getDisputeListColumn;
