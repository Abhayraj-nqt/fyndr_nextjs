"use client";
import LocalSearch from "@/components/global/search/local-search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/global/multiselect-dropdown/multiselectDropdown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DateRangePicker from "../../user-details/_components/range-calendar";

const statusoptions = [
  { value: "INACTIVE", label: "Inactive" },
  { value: "EXPIRED", label: "Expired" },
  { value: "ACTIVE  ", label: "Active" },
];
const countryOptions = [
  { value: "US", label: "US" },
  { value: "IN", label: "IN" },
];

const campaignOption = [
  { value: "offers", label: "Offers" },
  { value: "events", label: "Events" },
  { value: "coupons", label: "Coupons" },
];
const CampaignsHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("businessName") || "");
  const [country, setCountry] = useState(searchParams.get("country") || "");
  const [status, setStatus] = useState(searchParams.getAll("status") || "");
  const [campaignType, setCampaignType] = useState(
    searchParams.getAll("campaignType")
  );
  const [dates, setDates] = useState<{
  startDate: Date | null;
  endDate: Date | null;
}>({
  startDate: searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : null,
  endDate: searchParams.get("endDate") ? new Date(searchParams.get("endDate")!) : null,
});

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("businessName", query);
    if (country) params.set("country", country);
    status.forEach((s) => params.append("status", s));
    campaignType.forEach((c) => params.append("campaignType", c));
    if (dates.startDate) params.set("startDate", dates.startDate.toISOString().split("T")[0]);
    if (dates.endDate) params.set("endDate", dates.endDate.toISOString().split("T")[0]);

    router.push(`?${params.toString()}`);
  }, [query, country, status, campaignType, dates]);
    const handleDateRangeChange = (
    startDate: Date | null,
    endDate: Date | null
  ): void => {
    setDates({ startDate, endDate });
  };
  return (
    <div className="mb-6">
      <div className="w-[50%] space-y-3">
        <LocalSearch route={pathname} placeholder="Search Business" className="pl-0" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Input
              readOnly
              value={
                countryOptions.find((c) => c.value === country)?.label ||
                "Select Country"
              }
              className={`cursor-pointer bg-white min-w-[150px] text-left h-[46px] rounded-[10px] ${
                !country ? "text-dark-400" : "text-black"
              }`}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {countryOptions.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                onSelect={() => setCountry(opt.value)}
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <MultiSelect
          options={statusoptions}
          selectedValues={status}
          onChange={setStatus}
          placeholder="Status"
          className="text-dark-400"
        />
        <MultiSelect
          options={campaignOption}
          selectedValues={campaignType}
          onChange={setCampaignType}
          placeholder="Campaign Type"
        />
        <DateRangePicker
          onDateRangeChange={handleDateRangeChange}
          placeholder="Select date range"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default CampaignsHeader;
