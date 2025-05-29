"use client";

import React, { useState } from "react";

import { DataTable } from "@/components/global/data-table/data-table";
import { useUser } from "@/hooks/auth";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTableRowAction } from "@/types/data-table";

import { getOfferSummaryDetailsColoumn } from "./offer-summary-details-coloumn";

type OfferSummaryTableProps = {
  data: OfferPurchaseProps[];
  count: number;
  currentPage: number;
  pageSize: number;
};

const OfferSummaryTable: React.FC<OfferSummaryTableProps> = ({
  data,
  count,
  currentPage,
  pageSize,
}) => {
  const { user } = useUser();
  const userTimeZone = user?.userTimeZone;
  const [searchText, setSearchText] = useState<string>("");
  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<OfferPurchaseProps> | null>(null);

  const columns = React.useMemo(
    () => getOfferSummaryDetailsColoumn({ setRowAction, userTimeZone }),
    [userTimeZone]
  );

  console.log("Table data length:", data?.length);
  console.log("Current page in table:", currentPage);
  console.log("Total count:", count);

  const { table } = useDataTable({
    data: data || [],
    columns,
    pageCount: Math.ceil(count / pageSize),
    getRowId: (row) => `${row.objid}`,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      {/* <div className="flex mb-8">
          <div></div>
          <div>
            <Input type="search"
             value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by voucher code, name & phone no."

            />
            
          </div>
        </div> */}
      <DataTable table={table} />
    </>
  );
};

export default OfferSummaryTable;
