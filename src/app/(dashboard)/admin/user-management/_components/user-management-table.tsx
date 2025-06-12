"use client"
import { getAllUsers } from '@/actions/admin.actions';
import { UserDetail } from '@/types/api-response/adminUserManagement.response';
import { DataTableRowAction } from '@/types/data-table';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import getUserColumns from './get-user-columns';
import { useDataTable } from '@/hooks/use-data-table';
import { DataTable } from '@/components/global/data-table/data-table';

type Props = {
  data: Awaited<ReturnType<typeof getAllUsers>>;
};

const UserManagementTable = ({data}: Props) => {
    const searchParams = useSearchParams();
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<UserDetail> | null>(null);
  const columns = React.useMemo(
    () => getUserColumns({ setRowAction }),
    []
  );
  const count = data?.data?.data?.count ?? 0
  const campaignDetails = data.data?.data.users || [];
  const { table } = useDataTable({
    data: campaignDetails || [],
    columns,
    pageCount: Math.floor(count / pageSize),
    getRowId: (_row, index) => `${index}`,
    shallow: false,
    clearOnDefault: true,
  });
  return (
    <div >
        <DataTable className="bg-white overflow-x-scroll" table={table} />
    </div>
  )
}

export default UserManagementTable