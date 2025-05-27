"use client"

import { DataTableColumnHeader } from "@/components/global/data-table/data-table-column-header";
import { DataTableRowAction } from "@/types/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React from "react";
type Props = {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<RevenueResponse> | null>
  >;
};
const getRevenueColumn = ({
  setRowAction,
}: Props): ColumnDef<RevenueDetail>[] => {
  return [
    {
      id: "businessName",
      accessorKey: "businessName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Business Name" />
      ),
      cell: ({ row }) => <div>{row.original.businessName}</div>,
      enableSorting: false,
    },
    {
      id: "totalRevenue",
      accessorKey: "totalRevenue",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Payments Processed" />
      ),
      cell: ({ row }) => <div>{row.original.currencySymbol}{row.original.totalRevenue}</div>,
      enableSorting: false,
    },
    {
      id: "offerRevenue",
      accessorKey: "offerRevenue",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Offers Payments" />
      ),
      cell: ({ row }) => <div>{row.original.currencySymbol}{row.original.offers}</div>,
      enableSorting: false,
    },
    {
      id: "catalogRevenue",
      accessorKey: "catalogRevenue",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Catalog Payments" />
      ),
      cell: ({ row }) => <div>{row.original.currencySymbol}{row.original.catalog}</div>,
      enableSorting: false,
    },
    {
      id: "promotion",
      accessorKey: "promotion",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Promotional Payments" />
      ),
      cell: ({ row }) => <div>{row.original.currencySymbol}{row.original.cmpnPromo}</div>,
      enableSorting: false,
    },
    {
      id: "fyndrCash",
      accessorKey: "fyndrCash",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Fyndr Cash" />
      ),
      cell: ({ row }) => <div>{row.original.currencySymbol}{row.original.fyndrCash}</div>,
      enableSorting: false,
    },
    {
      id: "interactions",
      accessorKey: "interactions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Interactions Payments" />
      ),
      cell: ({ row }) => <div>{row.original.currencySymbol}{row.original.interaction}</div>,
      enableSorting: false,
    },
    {
      id: "events",
      accessorKey: "events",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Events Payments" />
      ),
      cell: ({ row }) => <div>{row.original.currencySymbol}{row.original.event}</div>,
      enableSorting: false,
    },
    {
      id: "action",
      accessorKey: "action",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => <div> <Link href={"/admin/revenue"}>Login</Link> </div>,
      enableSorting: false,
    },
  ];
};

export default getRevenueColumn;
