"use server";

import { API_BASE_URL } from "@/environment";
import { _post } from "@/lib/handlers/fetch";
import { GetBusinessDirectory } from "@/types/store/store.action.types";

export const onGetBusinessDirectory: GetBusinessDirectory = async ({
  params,
  payload,
}) => {
  const { page, pageSize, search } = params;
  let endpoint = `${API_BASE_URL}/catalogue/v2/search?pgStart=${page}&pgSize=${pageSize}`;

  if (search) {
    endpoint = `${endpoint}&text=${search.replace("&", "%26")}`;
  }

  return _post(endpoint, payload, {
    cache: "force-cache",
    next: {
      revalidate: 10000,
    },
  });
};
