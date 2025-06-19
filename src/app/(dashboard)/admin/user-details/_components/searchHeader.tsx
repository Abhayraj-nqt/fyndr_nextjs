"use client";

import LocalSearch from "@/components/global/search/local-search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { getAllPromoCodes } from "@/actions/promocode.action";
import DateRangePicker from "./range-calendar";
import { getAllChannel } from "@/actions/auth.actions";
import { DropDownOprions } from "@/types/api-response/findUsChannel.response";
import Select from "@/components/global/input/select/index";
import { SelectOption } from "@/components/global/input/select/select.types";
import { getFilteredStatesByCountry } from "@/lib/utils";
import { COUNTRIES } from "@/constants";

const statusOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Deleted", value: "DELETED" },
  { label: "Suspended", value: "SUSPENDED" },
];
const customerOption = [
  { label: "Individual", value: "INDIVIDUAL" },
  { label: "Business", value: "BUSINESS" },
];
type Props = {
  userCount?: number;
};

export const SearchHeader = ({ userCount = 0 }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [promoList, setPromoList] = useState<SelectOption[]>([]);
  const [channelList, setChannelList] = useState<DropDownOprions[]>([]);
  const [stateData, setStateData] = useState<
    { value: string; label: string }[]
  >([]);
  const [promoCode, setPromoCode] = useState(searchParams.get("promoCode") || "");
  const [country, setCountry] = useState(searchParams.get("country") || "US");
  const [state, setState] = useState(searchParams.get("state") || "");

  const updateSingleParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  useEffect(() => {
    if (!country) {
      setStateData([]);
      setState("");
      updateSingleParam("state", "");
      return;
    }
    (async () => {
      const states = await getFilteredStatesByCountry(country);
      setStateData(states);
    })();
  }, [country]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllPromoCodes();
        if (res.success && res.data) {
          const options: SelectOption[] = res.data.map((item: any) => ({
            value: item.id.toString(),
            label: item.promoCode,
          }));

          console.log("promocodelist", options);
          setPromoList(options);
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

  useEffect(() => {
    const urlPromoCode = searchParams.get("promoCode") || "";
    const urlCountry = searchParams.get("country") || "";
    const urlState = searchParams.get("state") || "";

    if (urlPromoCode !== promoCode) setPromoCode(urlPromoCode);
    if (urlCountry !== country) setCountry(urlCountry);
    if (urlState !== state) setState(urlState);
  }, [searchParams]);

  const handlePromoCodeChange = (newPromoCode: string) => {
    setPromoCode(newPromoCode);
    const params = new URLSearchParams(searchParams.toString());
    if (newPromoCode) {
      params.set("promoCode", newPromoCode);
    } else {
      params.delete("promoCode");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    setState("");
    const params = new URLSearchParams(searchParams.toString());
    params.set("country", newCountry);
    params.delete("state");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleStateChange = (newState: string) => {
    setState(newState);
    const params = new URLSearchParams(searchParams.toString());
    if (newState) {
      params.set("state", newState);
    } else {
      params.delete("state");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleCustomerChange = (values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (values.length > 0) {
      params.set("customer", values.join(","));
    } else {
      params.delete("customer");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleStatusChange = (values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (values.length > 0) {
      params.set("status", values.join(","));
    } else {
      params.delete("status");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleChannelChange = (values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (values.length > 0) {
      params.set("channel", values.join(","));
    } else {
      params.delete("channel");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <div className="flex-center gap-2">
        <LocalSearch
          route={pathname}
          placeholder="Search"
          className="flex-1 text-[#333] text-left h-[46px] rounded-[10px] "
        />
        <Select
          options={statusOptions}
          placeholder="Status"
          placeholderClassName="text-blue-500"
          onValueChange={handleStatusChange}
          multi
          className="flex-1"
        />

        <Select
          options={customerOption}
          onValueChange={handleCustomerChange}
          placeholder="Customer Type"
          multi
          className="flex-1"
        />

        <DateRangePicker placeholder="Select date" className="flex-1" />

        <Select
          options={promoList}
          placeholder="Promo Codes"
          onValueChange={handlePromoCodeChange}
          searchable={true}
          className="flex-1"
        />

        <Select
          options={COUNTRIES}
          value={country}
          onValueChange={(newCountry) => handleCountryChange(newCountry)}
          searchable
          className="flex-1"
          placeholder="Country"
        />
        <Select
          options={stateData}
          placeholder="State"
          value={state}
          onValueChange={handleStateChange}
          className="flex-1"
        />
        <Select
          options={channelList}
          placeholder="Channel"
          multi
          searchable
          onValueChange={handleChannelChange}
          className="flex-1"
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