"use server";

import { API_BASE_URL } from "@/environment";
import { GetStoreProps } from "@/types/api-params/store.params";
import { StoresResponse } from "@/types/api-response/store.response";

import { _post } from "../handlers/fetch";

export const onGetStores: GetStoreProps = async (params, payload) => {
  const { page, pageSize, search } = params;

  let endpoint = `${API_BASE_URL}/catalogue/v2/search?pgStart=${page}&pgSize=${pageSize}`;

  if (search) {
    endpoint = `${endpoint}&text=${search.replace("&", "%26")}`;
  }

  return _post<StoresResponse>(endpoint, payload, {
    cache: "force-cache",
    next: {
      revalidate: 10000,
    },
  });
};
