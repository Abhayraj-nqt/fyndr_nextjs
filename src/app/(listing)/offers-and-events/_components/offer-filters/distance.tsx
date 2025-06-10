"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";

import Select from "@/components/global/input/select/index";
import { formUrlQuery } from "@/lib/utils/url";

type Props = {
  className?: string;
};

const Distance = ({ className }: Props) => {
  const searchParams = useSearchParams();
  const currentOrder = searchParams.get("order");
  const router = useRouter();
  const [orderBy, setOrderBy] = useState(currentOrder || "asc");

  const DISTANCE_OPTIONS = [
    { value: "asc", label: "Distance: Closest to Furthest" },
    { value: "desc", label: "Distance: Farthest to Closest" },
  ];

  // Debounce the URL update to prevent multiple rapid calls
  const handleOrderByChange = useCallback(() => {
    if (orderBy === currentOrder) return; // Prevent unnecessary updates

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "order",
      value: orderBy,
    });
    router.replace(newUrl, { scroll: false }); // Use replace instead of push
  }, [orderBy, currentOrder, searchParams, router]);

  // Only update URL when orderBy actually changes and differs from current
  useEffect(() => {
    if (orderBy !== currentOrder) {
      const timeoutId = setTimeout(handleOrderByChange, 300); // Debounce
      return () => clearTimeout(timeoutId);
    }
  }, [orderBy, currentOrder, handleOrderByChange]);

  return (
    <Select
      defaultValue={"asc"}
      value={orderBy}
      options={DISTANCE_OPTIONS}
      onValueChange={setOrderBy}
      className={`${className}`}
    />
  );
};

export default Distance;
