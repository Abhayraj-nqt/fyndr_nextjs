import { DataTableColumnHeader } from "@/components/global/data-table/data-table-column-header";
import { AdminUserProps } from "@/types/api-response/user.response";
import { ColumnDef } from "@tanstack/react-table";
import Button from "@/components/global/buttons";
import { cn } from "@/lib/utils";
import { DataTableRowAction } from "@/types/data-table";

type Props = {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<AdminUserProps> | null>
  >;
};

export function getUserDetailsTableColumns({
  setRowAction,
}: Props): ColumnDef<AdminUserProps>[] {
  return [
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => <div>
        {row.getValue("name")}
        </div>,
      enableSorting: false,
    },
    {
      id: "businessName",
      accessorKey: "businessName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Business Name" />
      ),
    cell: ({row}) => <div>{row.original.businessName || "NA"}</div>,
      enableSorting: false,
    },
    {
      id: "address",
      accessorKey: "address",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Address" />
      ),
      cell: ({ row }) => {
        const addressObj = row.original.address;
        const formattedAddress = cn(
          addressObj?.addressLine1 ? `${addressObj?.addressLine1}` : "",
          addressObj?.addressLine1 ? `, ${addressObj?.addressLine1}` : "",
          addressObj?.city ? `, ${addressObj?.city}` : "",
          addressObj?.state ? `, ${addressObj?.state}` : "",
          addressObj?.postalCode ? ` ${addressObj?.postalCode}` : ""
        );

        return <div>{formattedAddress}</div>;
      },
      enableSorting: false,
    },
    {
      id: "email",
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
      enableSorting: false,
    },
    {
      id: "phone",
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
      ),
      cell: ({ row }) => {
        const phone = row.original.phone.phoneNumber;
        const countryCode = row.original.phone.countryCode; 
        return <div>{phone ? `${countryCode}${phone}` : "NA"}</div>;
      },
      enableSorting: false,
    },
    {
      id: "registeredOn",
      accessorKey: "createDt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Registered On" />
      ),
      cell: ({ row }) => {
        return <div>{row.getValue("registeredOn")}</div>;
      },
      enableHiding: false,
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => <div>{row.getValue("status")}</div>,
      enableSorting: false,
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <div>
          <Button
            onClick={() => setRowAction({ row, variant: "update" })}
            variant="primary"
          >
            Actions
          </Button>
        </div>
      ),
    },
  ];
}
