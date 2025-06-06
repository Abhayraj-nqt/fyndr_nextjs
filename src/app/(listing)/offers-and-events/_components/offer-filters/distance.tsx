/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    handleOrderByChange();
  }, [orderBy]);

  const handleOrderByChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "order",
      value: orderBy,
    });
    router.replace(newUrl);
  };

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
