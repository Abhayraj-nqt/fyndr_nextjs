"use server";

import { API_BASE_URL } from "@/environment";
import { _get } from "@/lib/handlers/fetch";
import { GetCategoriesProps } from "@/types/api-params/category.params";
import { CategoriesResponse } from "@/types/api-response/category.response";

export const onGetCategories: GetCategoriesProps = async () => {
  const endpoint = `${API_BASE_URL}/campaign/public/categories`;
  return _get<CategoriesResponse>(endpoint, {
    cache: "force-cache",
  });
};
