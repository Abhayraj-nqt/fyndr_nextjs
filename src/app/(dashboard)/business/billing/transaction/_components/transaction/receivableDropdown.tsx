"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FilterItem = {
  key: string;
  value: string;
};

const statusList: FilterItem[] = [
  { key: "All", value: "All" },
  { key: "paid", value: "paid" },
  { key: "pending", value: "pending" },
  { key: "failed", value: "failed" },
];

const channelList: FilterItem[] = [
  { key: "All", value: "All" },
  { key: "offers", value: "offers" },
  { key: "catalog", value: "catalog" },
  { key: "events", value: "events" },
];

const ReceivableDropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filterType, setFilterType] = useState("All");
  const [filterChannel, setFilterChannel] = useState("All");

  useEffect(() => {
    const status = searchParams.get("status");
    const channel = searchParams.get("channel");

    if (status) setFilterType(status);
    if (channel) setFilterChannel(channel);
  }, [searchParams]);

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : ".");
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full md:w-auto bg-white text-black border border-black-200 hover:bg-beige-100">{`Status: ${filterType}`}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {statusList.map((item) => (
            <DropdownMenuItem
              key={item.key}
              onClick={() => {
                setFilterType(item.value);
                updateQuery("status", item.value);
              }}
            >
              {item.value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full md:w-auto bg-white text-black border border-black-200 hover:bg-beige-100">{`Channel: ${filterChannel}`}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {channelList.map((item) => (
            <DropdownMenuItem
              key={item.key}
              onClick={() => {
                setFilterChannel(item.value);
                updateQuery("channel", item.value);
              }}
            >
              {item.value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ReceivableDropdown;
