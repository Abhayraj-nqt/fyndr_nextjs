"use server";

import { API_BASE_URL } from "@/environment";
import { _post } from "@/lib/handlers/fetch";
import { GetStoreProps } from "@/types/api-params/store.params";
import { StoresResponse } from "@/types/api-response/store.response";
import { GetBusinessDirectory } from "@/types/store/store.action.types";

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

export const onGetBusinessDirectory: GetBusinessDirectory = async ({
  params,
  payload,
}) => {
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
