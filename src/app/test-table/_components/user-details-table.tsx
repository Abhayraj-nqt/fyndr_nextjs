"use client";

import { onGetUsers } from "@/actions/admin.actions";
import React from "react";
import { getUserDetailsTableColumns } from "./user-details-table-columns";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/global/data-table/data-table";
import { DataTableRowAction } from "@/types/data-table";
import { AdminUserProps } from "@/types/api-response/user.response";
import ActionsDialog from "./actions-dialog";
import { useSearchParams } from "next/navigation";

type Props = {
  promises: Promise<[Awaited<ReturnType<typeof onGetUsers>>]>;
};

const UserDetailsTable = ({ promises }: Props) => {
  const searchParams = useSearchParams();

  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const [{ data, success, error }] = React.use(promises);

  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<AdminUserProps> | null>(null);

  const columns = React.useMemo(
    () => getUserDetailsTableColumns({ setRowAction }),
    []
  );

  if (!success || !data) return <div>Error</div>;

  console.log({ data });

  const { count, users } = data.data;

  const { table } = useDataTable({
    data: users || [],
    columns,
    pageCount: Math.floor(count / pageSize),
    getRowId: (originalRow) => `${originalRow.objId}`,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      <DataTable table={table} />
      <ActionsDialog
        open={rowAction?.variant === "update"}
        onOpenChange={() => setRowAction(null)}
        row={rowAction?.row.original ?? null}
      />
    </>
  );
};

export default UserDetailsTable;
