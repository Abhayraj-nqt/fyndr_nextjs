"use server";

import { headers } from "next/headers";

export const onGetCurrentUrl = async () => {
  const headersList = await headers();
  const host = headersList.get("host");
  const pathname = headersList.get("x-invoke-path") || "/";
  const protocol = headersList.get("x-forwarded-proto") || "https";

  //   return `${protocol}://${host}${pathname}`;
  const fullUrl = headersList.get("x-url") || "";
  return fullUrl;
};

export const onGetPathname = async () => {
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "/";
  return pathname.split("/").filter(Boolean);
};

export const onGetSearchParams = async () => {
  const headersList = await headers();
  const referer = headersList.get("referer");

  if (referer) {
    const url = new URL(referer);
    return Object.fromEntries(url.searchParams.entries());
  }

  return {};
};
