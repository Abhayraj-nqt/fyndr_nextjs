import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import React, { useState } from "react";

import Button from "@/components/global/buttons";
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
import { cn } from "@/lib/utils";

function FilterTable() {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const statusColumn = [
    { value: "INITIATED", label: "Initiated" },
    { value: "CANCELED", label: "Canceled" },
    { value: "DISPUTED", label: "Disputed" },
    {
      value: "SETTLED_WITH_CUSTOMER_PAYMENT",
      label: "Settled With Customer Payment",
      disabled: false,
    },
    { value: "SETTLED_WITHOUT_PAYMENT", label: "Settled Without Payment" },
  ];

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

  return (
    <div className="mb-5 flex flex-row flex-wrap gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="primary" className="min-w-12 justify-between">
            {selectedReasons?.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {selectedReasons.map((reason) => (
                  <span
                    key={reason}
                    className="flex items-center gap-1 rounded bg-[#E8E8E8] px-2 py-0.5 text-xs text-black"
                  >
                    {reason}
                    <X
                      size={18}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeReason(reason);
                      }}
                    />
                  </span>
                ))}
              </div>
            ) : (
              "Select refund reasons"
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {statusColumn.map((reason) => (
            <DropdownMenuItem
              key={reason.value}
              disabled={reason.disabled}
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
        {/* Start Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="primary"
              data-empty={!startDate}
              className="w-52 justify-start font-normal"
            >
              <CalendarIcon className="mr-2 size-4" />
              {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
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

        {/* End Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="primary"
              data-empty={!endDate}
              className="w-52 justify-start font-normal"
            >
              <CalendarIcon className="mr-2 size-4" />
              {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default FilterTable;
