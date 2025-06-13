/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";

import { onDisputeList } from "@/actions/dispute.action";
import Button from "@/components/global/buttons";
import { DataTable } from "@/components/global/data-table/data-table";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDataTable } from "@/hooks/use-data-table";
import { cn } from "@/lib/utils";
import {
  DisputeDetailsProps,
  DisputeListResponse,
} from "@/types/api-response/dispute.response";
import { DataTableRowAction } from "@/types/data-table";
import { ActionResponse } from "@/types/global";

import DisputeCommentList from "./dispute-comment-list";
import getDisputeListColumn from "./dispute-list-details-coloumn";
import DisputeReasion from "./dispute-reasion";
import DisputeRefund from "./dispute-refund";
interface DisputeListTableProps {
  promises: Promise<[ActionResponse<DisputeListResponse>]>;
}
const DisputeListTable = ({ promises }: DisputeListTableProps) => {
  console.log("promises", promises);
  const statusColumn = [
    { value: "INITIATED", label: "Initiated" },
    { value: "CANCELED", label: "Canceled" },
    { value: "DISPUTED", label: "Disputed" },
    {
      value: "SETTLED_WITH_CUSTOMER_PAYMENT",
      label: "Settled With Customer Payment",
    },
    { value: "SETTLED_WITHOUT_PAYMENT", label: "Settled Without Payment" },
  ];
  const [rowAction, setRowAction] =
    useState<DataTableRowAction<DisputeDetailsProps> | null>(null);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [loading, setLoading] = useState(false);
  const [disputeData, setDisputeData] = useState<DisputeDetailsProps[]>([]);
  const [count, setCount] = useState(0);
  const fetchDisputeData = async () => {
    setLoading(true);
    try {
      const result = await onDisputeList({
        // status: selectedReasons.map(
        //   (r) => statusColumn.find((s) => s.label === r)?.value
        // ),
        status: selectedReasons
          .map((r) => statusColumn.find((s) => s.label === r)?.value)
          .filter((value): value is string => value !== undefined),

        startDate: startDate ? startDate.toISOString() : "",
        endDate: endDate ? endDate.toISOString() : "",
      });
      if (result.success) {
        setDisputeData(result?.data?.disputeDetails || []);
        setCount(result?.data?.count ?? 0);
      }
    } catch (err) {
      console.error("Failed to fetch disputes:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDisputeData();
  }, [selectedReasons, startDate, endDate]);
  const toggleReason = (label: string) => {
    setSelectedReasons((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };
  const removeReason = (label: string) => {
    setSelectedReasons((prev) => prev.filter((item) => item !== label));
  };
  const getDisputeListColumnCallback = React.useCallback(
    () => getDisputeListColumn({ setRowAction }),
    [setRowAction]
  );
  const columns = getDisputeListColumnCallback();

  const { table } = useDataTable({
    data: disputeData,
    columns,
    pageCount: Math.floor(count / 10),
    getRowId: (row) => `${row?.disputeId}`,
  });
  return (
    <>
      {loading ? (
        <div className="py-10 text-center">Loading...</div>
      ) : (
        <>
          <div className="mb-5 flex flex-row flex-wrap gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="min-w-12 cursor-pointer justify-between rounded-10 border border-[#E8E8E8] bg-white px-3 py-2 text-[#d9d9d9]">
                  {selectedReasons.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {selectedReasons.map((reason) => (
                        <span
                          key={reason}
                          className="flex h-10 items-center gap-1 rounded bg-[#E8E8E8] px-2 py-0.5 text-xs  "
                        >
                          <span className="text-black"> {reason}</span>
                          <X
                            size={18}
                            className="cursor-pointer"
                            onClick={() => {
                              removeReason(reason);
                            }}
                          />
                        </span>
                      ))}
                    </div>
                  ) : (
                    "Select refund reasons"
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {statusColumn.map((reason) => (
                  <DropdownMenuItem
                    key={reason.value}
                    onClick={() => toggleReason(reason.label)}
                    className={cn(
                      "w-full cursor-pointer",
                      selectedReasons.includes(reason.label) && "bg-blue-100"
                    )}
                  >
                    {reason.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="ml-auto flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="primary"
                    className="w-52 justify-start  border border-[#d9d9d9] bg-[#FFF] font-normal text-black hover:bg-[#FFF]"
                  >
                    <CalendarIcon className="mr-2 size-4 text-[#d9d9d9]" />
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span className="text-[#d9d9d9]">Start Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="primary"
                    className="w-52 justify-start rounded-none border border-[#d9d9d9] bg-[#FFF] font-normal  text-black hover:bg-[#FFF]"
                  >
                    <CalendarIcon className="mr-2 size-4 text-[#d9d9d9]" />
                    {endDate ? (
                      format(endDate, "PPP")
                    ) : (
                      <span className="text-[#d9d9d9]">End Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DataTable table={table} showPagination={false} />
        </>
      )}
      <DisputeReasion
        open={rowAction?.variant === "update"}
        onOpenChange={() => setRowAction(null)}
        row={rowAction?.row.original ?? null}
      />
      <DisputeRefund
        open={rowAction?.variant === "refund"}
        onOpenChange={() => setRowAction(null)}
        row={rowAction?.row.original ?? null}
      />
      <DisputeCommentList
        open={rowAction?.variant === "comments"}
        onOpenChange={() => setRowAction(null)}
        row={rowAction?.row.original ?? null}
      />
    </>
  );
};
export default DisputeListTable;
