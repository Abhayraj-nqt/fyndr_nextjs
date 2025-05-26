"use client";

import { getUserDetailsTableColumns } from "@/app/test-table/_components/user-details-table-columns";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTableRowAction } from "@/types/data-table";
import { count } from "console";
import React from "react";
import { getOfferSummaryDetailsColoumn } from "./offer-summary-details-coloumn";
import { DataTable } from "@/components/global/data-table/data-table";

type OfferSummaryTableProps = {
  data: OfferPurchaseProps[];
  count : number;
  pageSize :number;
};

const OfferSummaryTable: React.FC<OfferSummaryTableProps> = ({ data , count ,pageSize}) => {


      const [rowAction, setRowAction] =
        React.useState<DataTableRowAction<OfferPurchaseProps> | null>(null);
  const columns = React.useMemo(
    () =>getOfferSummaryDetailsColoumn({ setRowAction }),
    []
  );

  const { table } = useDataTable({
    data: data || [],
    columns,
    pageCount: Math.floor(count / pageSize),
    getRowId: (originalRow) => `${originalRow.objid}`,
    shallow: false,
    clearOnDefault: true,
  });
  return (
  
   <> 
     <DataTable table={table} />
  </>
  );
};

export default OfferSummaryTable;
