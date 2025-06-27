"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

import Select from "@/components/global/input/select";
import { formUrlQuery } from "@/lib/utils/url";

type Props = {
  className?: string;
};

const RatingsSorterSelect = ({ className }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial values from URL params or use defaults
  const initialSortBy = searchParams.get("sortBy") || "RATING";
  const initialOrderBy = searchParams.get("orderBy") || "DESC";
  const [value, setValue] = useState<string>(
    `${initialSortBy},${initialOrderBy}`
  );

  const sortingOptions = [
    { label: "Rating: Low To High", value: "RATING,ASC" },
    { label: "Rating: High To Low", value: "RATING,DESC" },
    { label: "Newest First", value: "CREATED_DT,DESC" },
    { label: "Oldest First", value: "CREATED_DT,ASC" },
  ];

  // Update state when URL changes (for browser back/forward navigation)
  useEffect(() => {
    const urlSortBy = searchParams.get("sortBy") || "RATING";
    const urlOrderBy = searchParams.get("orderBy") || "DESC";
    const urlValue = `${urlSortBy},${urlOrderBy}`;

    if (urlValue !== value) {
      setValue(urlValue);
    }
  }, [searchParams, value]);

  const handleValueChange = async (newValue: string) => {
    setValue(newValue);
    const [sortBy, orderBy] = newValue.split(",");

    // Get current search params as string
    const currentParams = searchParams.toString();

    // Update sortBy parameter
    let newUrl = formUrlQuery({
      params: currentParams,
      key: "sortBy",
      value: sortBy,
    });

    // Update orderBy parameter
    const updatedParams = new URLSearchParams(
      newUrl.split("?")[1] || ""
    ).toString();
    newUrl = formUrlQuery({
      params: updatedParams,
      key: "orderBy",
      value: orderBy,
    });

    // Navigate to new URL
    router.push(newUrl, { scroll: false });
  };

  return (
    <Select
      value={value}
      options={sortingOptions}
      onValueChange={handleValueChange}
      className={className}
    />
  );
};

export default RatingsSorterSelect;
