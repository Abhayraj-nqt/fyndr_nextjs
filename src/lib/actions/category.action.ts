"use server";

import { API_BASE_URL } from "@/environment";

import { _get } from "../handlers/fetch";

export async function getCategories() {
  const endpoint = `${API_BASE_URL}/campaign/public/categories`;
  return _get<CategoryProps[]>(endpoint, {
    cache: "force-cache",
  });
}
