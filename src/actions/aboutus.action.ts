"use server";

import { API_BASE_URL } from "@/environment";
import { _get } from "@/lib/handlers/fetch";
import { GetFaqCategories, GetFaqQuestions } from "@/types/api-params/about-us.params";



export const onGetFaqCategories: GetFaqCategories = async (params) => {
  const { entityId } = params;
  console.log(entityId, "entity");
  const endpoint = `${API_BASE_URL}/identity/faq_category/${entityId}`;

  return _get(endpoint, {
    cache: "force-cache",
  });
};

export const onGetFaqQuestions: GetFaqQuestions = async (params) => {
  const { searchStr, categoryId } = params;
  let endpoint = `${API_BASE_URL}/identity/frequentlyAskedQuestions/category/${categoryId}`;

  if (searchStr) {
    endpoint += `?text=${encodeURIComponent(searchStr)}`;
  }

  return _get(endpoint, {
    cache: "force-cache",
  });
};
