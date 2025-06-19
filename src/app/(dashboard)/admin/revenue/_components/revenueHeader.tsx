"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import LocalSearch from "@/components/global/search/local-search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import DateRangePicker from "../../user-details/_components/range-calendar";

const countryOptions = [
  { value: "US", label: "US" },
  { value: "IN", label: "IN" },
];

const RevenueHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [country, setCountry] = useState(searchParams.get("country") || "");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (country) {
      params.set("country", country);
    } else {
      params.delete("country");
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [country, router, pathname, searchParams]);

  // Optional: Handle date range changes if you need to do something with the values
  const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
    // The DateRangePicker component already handles URL updates
    // Add any additional logic here if needed
    console.log("Date range changed:", { startDate, endDate });
  };

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <LocalSearch
        route={pathname}
        placeholder="Search Business"
        className="flex-1"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Input
            readOnly
            value={
              countryOptions.find((c) => c.value === country)?.label || "Select Country"
            }
            className={`cursor-pointer bg-white min-w-[150px] text-left h-[46px] rounded-[10px] flex-1 ${
              !country ? "text-dark-400" : "text-black"
            }`}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {countryOptions.map((opt) => (
            <DropdownMenuItem key={opt.value} onSelect={() => setCountry(opt.value)}>
              {opt.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DateRangePicker
        onDateRangeChange={handleDateRangeChange}
        placeholder="Select date range"
        className="flex-1 text-left"
        startDateParam="startDate"
        endDateParam="endDate"
      />
    </div>
  );
};

export default RevenueHeader;