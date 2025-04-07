"use server";

import { API_BASE_URL } from "@/environment";
import { GetCategoriesProps } from "@/types/api-params/category.params";
import { CategoriesResponse } from "@/types/api-response/category.response";

import { _get } from "../handlers/fetch";

export const onGetCategories: GetCategoriesProps = async () => {
  const endpoint = `${API_BASE_URL}/campaign/public/categories`;
  return _get<CategoriesResponse>(endpoint, {
    cache: "force-cache",
  });
};
