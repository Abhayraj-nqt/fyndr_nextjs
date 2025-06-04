"use client"
import { CampaignDetail } from "@/types/api-response/adminCampaign.response";
import { DataTableRowAction } from "@/types/data-table";
import { useSearchParams } from "next/navigation";
import React from "react";
import getcampaignsTableColumns from "./getcampaignsTableColumns";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/global/data-table/data-table";
type Props = {
  data: Awaited<ReturnType<typeof import("@/actions/admin.actions").getCapaignDetails>>;
};

const CampaignsTable = ({ data }: Props) => {
  const searchParams = useSearchParams();
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<CampaignDetail> | null>(null);
  const columns = React.useMemo(
    () => getcampaignsTableColumns({ setRowAction }),
    []
  );
  const count = data?.data?.data?.campaignCount ?? 0
  const campaignDetails = data.data?.data.campaignDetails || [];
  const { table } = useDataTable({
    data: campaignDetails || [],
    columns,
    pageCount: Math.floor(count / pageSize),
    getRowId: (_row, index) => `${index}`,
    shallow: false,
    clearOnDefault: true,
  });
  return <div className="bg-white">
    <DataTable className="overflow-x-scroll" table={table}/>
  </div>;
};

export default CampaignsTable;
