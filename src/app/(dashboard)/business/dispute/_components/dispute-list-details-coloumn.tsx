import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React from "react";

import Button from "@/components/global/buttons";
import { DataTableColumnHeader } from "@/components/global/data-table/data-table-column-header";
import { useUser } from "@/hooks/auth";
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
  const { user } = useUser();
  const getColor = (status) => {
    switch (status) {
      case "INITIATED":
        return "#E2FFE5";
      case "CANCELED":
        return "#FFD6D6";
      case "DISPUTED":
        return "#E8E8E8";
      case "SETTLED_WITH_CUSTOMER_PAYMENT":
        return "#E2E2FF";
      case "SETTLED_WITHOUT_PAYMENT":
        return "#FFCBFD";
      default:
        return null;
    }
  };
  const getTextColor = (status) => {
    switch (status) {
      case "INITIATED":
        return "#07C603";
      case "CANCELED":
        return "#C63D03";
      case "DISPUTED":
        return "#6F6F6F";
      case "SETTLED_WITH_CUSTOMER_PAYMENT":
        return "#0000FF";
      case "SETTLED_WITHOUT_PAYMENT":
        return "#9E0F99";
      default:
        return null;
    }
  };
  return [
    {
      id: "invoiceId",
      accessorKey: "invoiceId",

      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Invoice ID"
          className="justify-center"
        />
      ),
      cell: ({ row }) => (
        <div className="flex-center">{row.getValue("invoiceId")}</div>
      ),
      enableSorting: false,
    },
    {
      id: "disputeId",
      accessorKey: "disputeId",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Dispute ID"
          className="flex-center"
        />
      ),
      cell: ({ row }) => (
        <div className="flex-center">{row.getValue("disputeId")}</div>
      ),
      enableSorting: false,
    },
    {
      id: "buyerEmail",
      accessorKey: "buyerEmail",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Client Email"
          className="w-full text-center"
        />
      ),
      cell: ({ row }) => (
        <div className="flex-center">{row.getValue("buyerEmail")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "disputeReason",
      accessorKey: "disputeReason",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Dispute Reason"
          className="flex-center"
        />
      ),
      cell: ({ row }) => (
        <div>
          {" "}
          <div
            onClick={() => setRowAction({ row, variant: "update" })}
            className="flex-center cursor-pointer text-primary"
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
        <DataTableColumnHeader
          column={column}
          title="Amount"
          className="flex-center"
        />
      ),
      cell: ({ row }) => (
        <div className="flex-center">
          {user?.currencySymbol}
          {row.getValue("amount")}
        </div>
      ),
      enableSorting: false,
    },
    {
      id: "disputeStatus",
      accessorKey: "disputeStatus",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Status"
          className="flex-center w-64"
        />
      ),
      cell: ({ row }) => {
        const status = row.getValue("disputeStatus") as string;

        return (
          <div
            style={{
              backgroundColor: getColor(status),
              color: getTextColor(status),
              padding: "4px 8px",
              borderRadius: "4px",
              fontWeight: 400,
              textAlign: "center",
              borderRadious: "10px",
              fontSize: "12px",
              borderRadius: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {status.replaceAll("_", " ")}
          </div>
        );
      },
      enableSorting: false,
    },

    {
      id: "Action",
      accessorKey: "action",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Action"
          className="flex-center w-32"
        />
      ),
      cell: ({ row }) => (
        <div className="flex flex-row justify-center gap-2 align-middle">
          <Button
            variant="primary"
            onClick={() => setRowAction({ row, variant: "refund" })}
            className="cursor-pointer rounded-[100] bg-primary text-white"
            disabled={
              row.getValue("disputeStatus") ===
                "SETTLED_WITH_CUSTOMER_PAYMENT" ||
              row.getValue("disputeStatus") === "SETTLED_WITHOUT_PAYMENT"
            }
          >
            Refund
          </Button>

          <div
            className="mt-2"
            onClick={() => setRowAction({ row, variant: "comments" })}
          >
            <span className=" cursor-pointer text-primary">comments</span>
          </div>
        </div>
      ),

      enableSorting: false,
    },
  ];
}

export default getDisputeListColumn;
