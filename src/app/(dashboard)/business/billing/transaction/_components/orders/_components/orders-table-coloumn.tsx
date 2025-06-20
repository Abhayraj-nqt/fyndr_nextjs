"use client ";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Space } from "lucide-react";

import Button from "@/components/global/buttons";
import { DataTableColumnHeader } from "@/components/global/data-table/data-table-column-header";
import { DataTableRowAction } from "@/types/data-table";
import SelectDeliveryTable from "./select-orders/select-delivery-table";
import Select from "@/components/global/input/select/index";
type Props = {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<OrdersResponse> | null>
  >;
  userTimeZone?: string;
};

export function getOrdersDetailsColoumn({
  setRowAction,
  userTimeZone,
}: Props): ColumnDef<OrdersResponse>[] {
    const paymentStatus = [
        { value: "paid", label: "Paid" },
        { value: "pending", label: "Pending" },
        { value: "canceled", label: "Canceled" },
    ];
    const deliveryType = [
        { value: "PROCESSING", label: "Processing" },
        { value: "READY_TO_PICK", label: "Ready To Pick" },
        { value: "FULFILLED", label: "Fulfilled" },
    ];
  return [
    {
      accessorKey: "invoiceId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Invoice ID" />
      ),
      cell: ({ row }) => <div>{row.original.invoiceId}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "invoicedTo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Invoice To" />
      ),
      cell: ({ row }) => <div>{row.original.invoicedTo}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "deliveryType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => {
        const type = row.original.deliveryType;
        return (
          <p>{type ? type.charAt(0).toUpperCase() + type.slice(1) : "-"}</p>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "orderDeliveryTime",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order Prep Time" />
      ),
      cell: ({ row }) => {
        const data = row.original.orderDeliveryTime;
        return data
          ? data.slice(0, 12) +
              " " +
              data.charAt(13).toUpperCase() +
              data.charAt(14).toUpperCase()
          : "-";
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "location",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location" />
      ),
      cell: ({ row }) => <p>{row.original.location || "-"}</p>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "deliveryStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Delivery Type" />
      ),
    cell: ({ row }) => {
  const record = row.original;
  const data = record.deliveryStatus;
  return (
     <SelectDeliveryTable data = {data}/>
  );
},
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "orderTime",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ordered Time" />
      ),
      cell: ({ row }) => {
        const data = row.original.orderTime;
        return data
          ? dayjs
              .tz(data, userTimeZone || dayjs.tz.guess())
              .format("MM-DD-YYYY , h:mm A")
          : "-";
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "paymentStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Payment" />
      ),
      cell: ({ row }) => {
        const item = row.original.paymentStatus;
        console.log(item,"item");
        // const record = row.original;
        return <p>{item}</p>;
        // const commonProps = {
        //   value: item.charAt(0).toUpperCase() + item.slice(1),
        //   bordered: false,
        //   style: {
        //     width: "100%",
        //     borderRadius: "1rem",
        //     color: getTextColor(item),
        //     backgroundColor: getColor(item),
        //   },
        // };

        // return item === "pending" ? (
        //   <DropdownComponent
        //     {...commonProps}
        //     options={paymentStatusDropdown}
        //     onChange={(value) => {
        //       setSelectedUser(value);
        //       handleOnChange(value, record);
        //       if (value === "canceled") {
        //         UpdateStatusFunction(value, record);
        //       }
        //     }}
        //   />
        // ) : (
        //   <DropdownComponent
        //     {...commonProps}
        //     disabled={true}
        //     newclassnmae={item === "canceled" ? "dropdownRed" : "dropdown"}
        //   />
        // );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "disputeStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dispute Status" />
      ),
      cell: ({ row }) => {
        const data = row.original.disputeStatus;
        return (
          <p>{data ? data.charAt(0) + data.slice(1).toLowerCase() : "-"}</p>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => {
        const record = row.original;
        return (
          <>
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={() => setRowAction({ row, variant: "print" })}
              >
                Print
              </Button>
              {record.paymentStatus !== "paid" && (
                <Button
                  onClick={() => setRowAction({ row, variant: "update" })}
                  variant="primary-outlined"
                >
                  Edit
                </Button>
              )}
            </div>
          </>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
