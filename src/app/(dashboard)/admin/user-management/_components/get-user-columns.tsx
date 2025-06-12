import { DataTableColumnHeader } from "@/components/global/data-table/data-table-column-header";
import { UserDetail } from "@/types/api-response/adminUserManagement.response";
import { DataTableRowAction } from "@/types/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
type Props = {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<UserDetail> | null>
  >;
};
const getUserColumns = ({ setRowAction }: Props): ColumnDef<UserDetail>[] => {
  return [
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.firstName}{" "}
          {row.original.lastName}
        </div>
      ),
      enableSorting: false,
    },
    {
      id: "role",
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.userRole}
        </div>
      ),
      enableSorting: false,
    },
    {
      id: "email",
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.userEmail}
        </div>
      ),
      enableSorting: false,
    },
    {
      id: "address",
      accessorKey: "address",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Address" />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.address1}{", "}{row.original.address2}
        </div>
      ),
      enableSorting: false,
    },
    {
      id: "phone",
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.phone}
        </div>
      ),
      enableSorting: false,
    },
    {
      id: "action",
      accessorKey: "action",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => (
        <div>
          <p>Login</p>
          <p>Update Password</p>
          <p>Delete</p>
        </div>
      ),
      enableSorting: false,
    },
  ];
};

export default getUserColumns;
