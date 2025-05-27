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
  dataResponse: Awaited<ReturnType<typeof onGetUsers>>;
};

const UserDetailsTable = ({ dataResponse }: Props) => {
  if (!dataResponse?.success || !dataResponse.data?.data?.users) {
    return <div></div>;
  }
  const {
    data: {
      data: { count, users },
    },
  } = dataResponse;
  const searchParams = useSearchParams();

  const pageSize = Number(searchParams.get("pageSize")) || 10;

  // const [{ data, success, error }] = React.use(promises);

  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<AdminUserProps> | null>(null);

  const columns = React.useMemo(
    () => getUserDetailsTableColumns({ setRowAction }),
    []
  );
  const { table } = useDataTable({
    data: users || [],
    columns,
    pageCount: Math.floor(count / pageSize),
    getRowId: (originalRow) => `${originalRow.objId}`,
    shallow: false,
    clearOnDefault: true,
  });

  const getRowIndicatorColor = React.useCallback((user: AdminUserProps) => {
    return user.business ? "bg-[rgb(157,209,163)]" : "bg-[rgb(145,189,236)]";
  }, []);

  return (
    <>
      <DataTable
        table={table}
        enableRowIndicator={true}
        getRowIndicatorColor={getRowIndicatorColor}
      />
      <ActionsDialog
        open={rowAction?.variant === "update"}
        onOpenChange={() => setRowAction(null)}
        row={rowAction?.row.original ?? null}
      />
    </>
  );
};

export default UserDetailsTable;
