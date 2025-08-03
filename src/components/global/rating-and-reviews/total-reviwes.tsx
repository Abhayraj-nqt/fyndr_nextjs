"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";
import { formUrlQuery } from "@/lib/utils/url";

type Props = {
  totalReviews: number;
  className?: string;
  noLink?: boolean;
};

const TotalReviews = ({ totalReviews, className, noLink = false }: Props) => {
  const searchParams = useSearchParams();
  const param = "reviews";

  const newUrl = formUrlQuery({
    params: searchParams.toString(),
    key: param,
    value: "true",
  });

  if (noLink) {
    return (
      <div className={cn("text-primary", className)}>
        ({totalReviews} Reviews)
      </div>
    );
  }

  return (
    <Link href={newUrl} className={cn("text-primary", className)}>
      ({totalReviews} Reviews)
    </Link>
  );
};

export default TotalReviews;
