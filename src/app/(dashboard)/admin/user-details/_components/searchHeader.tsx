"use client";
import { MultiSelect } from "@/components/global/multiselect-dropdown/multiselectDropdown";
import LocalSearch from "@/components/global/search/local-search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { State } from "country-state-city";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { getAllPromoCodes } from "@/actions/promocode.action";
import { getAllPromoCode } from "@/types/api-response/promocode.response";
import DateRangePicker, { DateRangeValue } from "./range-calendar";
import { getAllChannel } from "@/actions/auth.actions";
import {  DropDownOprions } from "@/types/api-response/findUsChannel.response";

const statusOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Deleted", value: "DELETED" },
  { label: "Suspended", value: "SUSPENDED" },
];

const customerOption = [
  { label: "INDIVIDUAL", value: "INDIVIDUAL" },
  { label: "BUSINESS", value: "BUSINESS" },
];

const countryOptions = [
  { value: "US", label: "United States" },
  { value: "IN", label: "India" },
  { value: "AU", label: "Australia" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  { value: "NZ", label: "New Zealand" },
];
type Props = {
  userCount?: number;
};
export const SearchHeader = ({ userCount = 0 }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [promoList, setPromoList] = useState<getAllPromoCode[]>([]);
  const [channelList, setChannelList] = useState<DropDownOprions[]>([]);
  const [status, setStatus] = useState<string[]>(searchParams.getAll("status"));
  const [customer, setCustomer] = useState<string[]>(
    searchParams.getAll("customer")
  );
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [promoCode, setPromoCode] = useState(
    searchParams.get("promoCode") || ""
  );
  const [country, setCountry] = useState(searchParams.get("country") || "");
  const [state, setState] = useState(searchParams.get("state") || "");
const [channel, setChannel] = useState<string[]>(
  searchParams.get("channel") ? [searchParams.get("channel")!] : []
);  const [stateData, setStateData] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRangeValue>({
    startDate: searchParams.get("startDate")
      ? new Date(searchParams.get("startDate")!)
      : null,
    endDate: searchParams.get("endDate")
      ? new Date(searchParams.get("endDate")!)
      : null,
  });

  const handleDateRangeChange = (
    startDate: Date | null,
    endDate: Date | null
  ): void => {
    setSelectedDateRange({ startDate, endDate });
  };

  useEffect(() => {
    if (!country) {
      setStateData([]);
      setState("");
      return;
    }
    (async () => {
      try {
        const raw = await State.getStatesOfCountry(country);
        const mapped = raw.map(({ isoCode: value, name: label, ...rest }) => ({
          value,
          label,
          ...rest,
        }));

        if (country === "US") {
          const toRemove = [
            "American Samoa",
            "Baker Island",
            "Guam",
            "Howland Island",
            "Jarvis Island",
            "Johnston Atoll",
            "Kingman Reef",
            "Midway Atoll",
            "Navassa Island",
            "Northern Mariana Islands",
            "Palmyra Atoll",
            "Puerto Rico",
            "United States Minor Outlying Islands",
            "United States Virgin Islands",
            "Wake Island",
          ];
          setStateData(mapped.filter((s) => !toRemove.includes(s.label)));
        } else {
          setStateData(mapped);
        }
      } catch (error) {
        console.error("Failed to load states:", error);
        setStateData([]);
      }
    })();
  }, [country]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllPromoCodes();
        if (res.success && res.data) {
          setPromoList(res.data);
        }
      } catch (err) {
        console.error("Failed to load promo codes", err);
      }

      try {
        const res = await getAllChannel();
        if (res.success && res.data) {
          const channelOptions = res.data?.map((ch) => ({
            value: ch.id.toString(),
            label: ch.options,
          }));
          setChannelList(channelOptions);
        }
      } catch (err) {
        console.error("Error fetching find us options");
      }
    })();
  }, []);

  const updateSearch = useCallback(() => {
    const qp = new URLSearchParams();

    if (query) qp.set("query", query);

    status.forEach((s) => qp.append("status", s));
    customer.forEach((c) => qp.append("customer", c));

    if (promoCode) qp.set("promoCode", promoCode);
    if (country) qp.set("country", country);
    if (state) qp.set("state", state);
    channel.forEach((c)=> qp.append("channel", c))
    if (selectedDateRange.startDate) {
      qp.set(
        "startDate",
        selectedDateRange.startDate.toISOString().split("T")[0]
      );
    }
    if (selectedDateRange.endDate) {
      qp.set("endDate", selectedDateRange.endDate.toISOString().split("T")[0]);
    }

    router.push(`${pathname}?${qp.toString()}`);
  }, [
    query,
    status,
    customer,
    promoCode,
    country,
    state,
    channel,
    pathname,
    router,
    selectedDateRange.startDate,
    selectedDateRange.endDate,
  ]);

  useEffect(() => {
    updateSearch();
  }, [updateSearch]);

  const handlePromoCodeClear = () => {
    setPromoCode("");
  };

  const handleCountryClear = () => {
    setCountry("");
    setState("");
  };

  const handleStateClear = () => {
    setState("");
  };

  return (
    <>
      <div className="flex-center gap-2">
        <LocalSearch
          route={pathname}
          placeholder="Search"
          className="flex-1 text-[#333] text-left h-[46px] rounded-[10px] pl-0"
        />

        <MultiSelect
          placeholder="Status"
          options={statusOptions}
          onChange={setStatus}
          selectedValues={status}
          className="flex-1"
        />

        <MultiSelect
          placeholder="Customer Type"
          options={customerOption}
          onChange={setCustomer}
          selectedValues={customer}
          className="flex-1 rounded-[10px] text-[#d9d9d9]"
        />

        <DateRangePicker
          onDateRangeChange={handleDateRangeChange}
          placeholder="Select date range"
          className="flex-1"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="flex-1">
            <Input
              readOnly
              value={
                promoList.find((p) => p.id.toString() === promoCode)
                  ?.promoCode || "Select Promo Code"
              }
              className={`cursor-pointer bg-white min-w-[150px] h-[46px] rounded-[10px] ${
                !promoCode ? "text-[#d9d9d9]" : "text-black"
              }`}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-60 overflow-y-auto">
            {promoCode && (
              <DropdownMenuItem onSelect={handlePromoCodeClear}>
                <span className="text-red-500">Clear Selection</span>
              </DropdownMenuItem>
            )}
            {promoList.map((p) => (
              <DropdownMenuItem
                key={p.id}
                onSelect={() => setPromoCode(p.id.toString())}
              >
                {p.promoCode} ({p.promoCodeType})
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="flex-1">
            <Input
              readOnly
              value={
                countryOptions.find((c) => c.value === country)?.label ||
                "Select Country"
              }
              className={`cursor-pointer bg-white min-w-[150px] text-left h-[46px] rounded-[10px] ${
                !country ? "text-[#d9d9d9]" : "text-black"
              }`}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {country && (
              <DropdownMenuItem onSelect={handleCountryClear}>
                <span className="text-red-500">Clear Selection</span>
              </DropdownMenuItem>
            )}
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="flex-1">
            <Input
              readOnly
              value={
                stateData.find((s) => s.value === state)?.label ||
                "Select State"
              }
              className={`cursor-pointer bg-white min-w-[150px] text-left h-[46px] rounded-[10px] ${
                !state ? "text-[#d9d9d9]" : "text-black"
              } `}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-60 overflow-y-auto">
            {stateData.length > 0 ? (
              <>
                {state && (
                  <DropdownMenuItem onSelect={handleStateClear}>
                    <span className="text-red-500">Clear Selection</span>
                  </DropdownMenuItem>
                )}
                {stateData.map((s) => (
                  <DropdownMenuItem
                    key={s.value}
                    onSelect={() => setState(s.value)}
                  >
                    {s.label}
                  </DropdownMenuItem>
                ))}
              </>
            ) : (
              <div className="px-2 py-1 text-sm text-gray-500">
                {!country ? "Select a country first" : "Loading states..."}
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <MultiSelect
          placeholder="Channel"
          options={channelList}
          onChange={setChannel}
          selectedValues={channel}
          className="flex-1 rounded-[10px] text-[#d9d9d9]"
        />
      </div>

      <div className="py-6 flex gap-6">
        <p className="font-medium text-base leading-[22px] text-[rgb(37,124,219)]">
          Total Registered Users: {userCount}
        </p>
        <div className="flex-center gap-2">
          <div className="bg-[rgb(157,209,163)] h-[18px] w-[18px] rounded-[50rem]"></div>
          <p>Business</p>
        </div>
        <div className="flex-center gap-2">
          <div className="bg-[rgb(145,189,236)] h-[18px] w-[18px] rounded-[50rem]"></div>
          <p>Individual</p>
        </div>
      </div>
    </>
  );
};
