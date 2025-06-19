"use client";
import React, { useEffect, useState } from "react";
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
import DateRangePicker from "../../user-details/_components/range-calendar";
import PieChartSection from "@/components/global/piechart/piechart";
import { getCapaignDetails } from "@/actions/admin.actions";
import Select from "@/components/global/input/select/index";
import { ADMIN_COUNTRY } from "@/constants";

const statusoptions = [
  { value: "INACTIVE", label: "Inactive" },
  { value: "EXPIRED", label: "Expired" },
  { value: "ACTIVE", label: "Active" },
{ value: "REJECTED", label: "Rejected" },
{ value: "PENDING_REVIEW", label: "Pending Review" },
];


const campaignOption = [
  { value: "offers", label: "Offers" },
  { value: "events", label: "Events" },
  { value: "coupons", label: "Coupons" },
];

type Props = {
  data: Awaited<ReturnType<typeof getCapaignDetails>>;
};

const CampaignsHeader = ({ data }: Props) => {
  console.log("props", data);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [country, setCountry] = useState(searchParams.get("country") || "");

  const toPercentageChartData = (countObj: Record<string, number>) => {
    const filteredEntries = Object.entries(countObj).filter(
      ([key]) => key.toLowerCase() !== "brochure"
    );

    const total = filteredEntries.reduce((sum, [, count]) => sum + count, 0);

    return filteredEntries.map(([key, value]) => ({
      name: key,
      visitors: total ? parseFloat(((value / total) * 100).toFixed(2)) : 0,
    }));
  };

  const statusChartData = toPercentageChartData(
    data?.data?.data?.campaignStatusCount ?? {}
  );
  const campaignTypeChartData = toPercentageChartData(
    data.data?.data?.campaignTypeCount ?? {}
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (country) {
      params.set("country", country);
    } else {
      params.delete("country");
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [country, router, pathname, searchParams]);

  const handleDateRangeChange = (
    startDate: Date | null,
    endDate: Date | null
  ): void => {
    console.log("Date range changed:", { startDate, endDate });
  };

  const handleStatusChange = (selectedValues: string[]) => {
    console.log("Status changed:", selectedValues);
  };

  const handleCampaignTypeChange = (selectedValues: string[]) => {
    console.log("Campaign type changed:", selectedValues);
  };

  return (
    <div className="mb-6 flex gap-4">
      <div className="w-[50%] space-y-3">
        <LocalSearch
          route={pathname}
          placeholder="Search Business"
          className="pl-0"
        />
        
        {/* <DropdownMenu>
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
        </DropdownMenu> */}

        <Select options={ADMIN_COUNTRY} placeholder="Country"/>

        <MultiSelect
          options={statusoptions}
          placeholder="Status"
          paramKey="status"
          className="text-dark-400"
          onChange={handleStatusChange}
        />
        
        <MultiSelect
          paramKey="campaignType"
          options={campaignOption}
          placeholder="Campaign Type"
          onChange={handleCampaignTypeChange}
        />
        
        <DateRangePicker
          onDateRangeChange={handleDateRangeChange}
          placeholder="Select date range"
          className="w-full"
          startDateParam="startDate"
          endDateParam="endDate"
        />
      </div>
      
      <div className="flex-1 flex gap-4">
        <div className="flex-1 bg-[#f4f8fd] rounded-lg shadow-md flex flex-col">
          <div className="flex justify-center pt-3">
            <p className="text-lg font-medium leading-tight text-[#333333]">
              Campaign Status
            </p>
          </div>

          <div className="flex justify-center p-3 pb-6">
            <PieChartSection
            chartData={statusChartData}
            colors={[]}
            height={150}
            width={200}
            outerRadius={40}
            showTooltip={true}
            showLabel={true}
             />
          </div>

          <div className="bg-white shadow-inner rounded-b-lg">
            <div className="flex justify-between items-start px-4 pt-2 pb-2">
              <div className="space-y-1">
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#F7AB66] mr-2" />
                  <p className="text-xs text-[#666666]">Active</p>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#82CC8B] mr-2" />
                  <p className="text-xs text-[#666666]">Expired</p>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#92BEED] mr-2" />
                  <p className="text-xs text-[#666666]">Inactive</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#f4f8fd] rounded-lg shadow-md flex flex-col">
          <div className="flex justify-center pt-3">
            <p className="text-lg font-medium leading-tight text-[#333333]">
              Campaign Type
            </p>
          </div>

          <div className="flex justify-center p-3 pb-6">
            <PieChartSection
            chartData={campaignTypeChartData}
            colors={[]}
            height={86}
            width={86}
            outerRadius={80}
            showTooltip={true}
            showLabel={true}
             />
          </div>
          
          <div className="bg-white shadow-inner rounded-b-lg">
            <div className="flex justify-between items-start px-4 pt-2 pb-2">
              <div className="space-y-1">
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#F7AB66] mr-2" />
                  <p className="text-xs text-[#666666]">Offers</p>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#82CC8B] mr-2" />
                  <p className="text-xs text-[#666666]">Events</p>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#92BEED] mr-2" />
                  <p className="text-xs text-[#666666]">Coupons</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignsHeader;