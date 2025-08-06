"use server";

import { API_BASE_URL } from "@/environment";
import { _get } from "@/lib/handlers/fetch";
import { GetCategories } from "@/types/category/category.action.types";

export const onGetCategories: GetCategories = async () => {
  const endpoint = `${API_BASE_URL}/campaign/public/categories`;
  return _get(endpoint, {
    cache: "force-cache",
  });
};
