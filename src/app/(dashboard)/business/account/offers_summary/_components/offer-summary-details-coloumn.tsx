"use client";

import { DataTableColumnHeader } from "@/components/global/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { DataTableRowAction } from "@/types/data-table";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import React from "react";


type Props = {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<OfferPurchaseProps> | null>
  >;
};

export function getOfferSummaryDetailsColoumn({
  setRowAction,
}: Props): ColumnDef<OfferPurchaseProps>[] {

   
  return [
    {
      accessorKey: "buyerName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => <div>{row.original.buyerName}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "offerTitle",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Offers Purchased" />
      ),
      cell: ({ row }) => <div>{row.original.offerTitle}</div>,
      enableSorting: false,
    },
    {
      accessorKey: "redeemptionStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.original.redeemptionStatus;
        const formatted =
          status === "partially-redeemed"
            ? "Partially Redeemed"
            : status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
        return <div>{formatted}</div>;
      },
      enableSorting: false,
    },
    {
      accessorKey: "buyerPhone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone Number" />
      ),
      cell: ({ row }) => <div>{row.original.buyerPhone || "NA"}</div>,
      enableSorting: false,
    },
   {
  accessorKey: "redemptionDt",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Date Redeemed" />
  ),
  cell: ({ row }) => {
    const redemptionDate = row.original.redemptionDt;
    console.log("Redemption Date:", redemptionDate); // 👈 this works now

    return (
      <div>
        {redemptionDate ? dayjs(redemptionDate).format("LL") : "N/A"}
      </div>
    );
  },
  enableSorting: false,
},
    {
      accessorKey: "invoiceDt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Purchase Date" />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.invoiceDt
            ? dayjs(row.original.invoiceDt).format("LL")
            : "N/A"}
        </div>
      ),
    
    },
    {
      accessorKey: "validTill",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Valid Till" />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.validTill
            ? dayjs(row.original.validTill).format("LL")
            : "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "redemptionTime",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Time of Redemption" />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.redemptionTime
            ? dayjs(row.original.redemptionTime).format("LL")
            : "N/A"}
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "voucherCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Voucher Code" />
      ),
      cell: ({ row }) => <div>{row.original.voucherCode}</div>,
      enableSorting: false,
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <Button
        //   onClick={() =>
        //     setRowAction({ type: "view-voucher", data: row.original })
        //   }
        >
          View
        </Button>
      ),
    },
  ];
}
