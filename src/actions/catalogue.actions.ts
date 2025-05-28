"use server";
import { revalidatePath } from "next/cache";

import ROUTES from "@/constants/routes";
import { API_BASE_URL } from "@/environment";
import { _delete, _get, _post, _put } from "@/lib/handlers/fetch";
import {
  AddCategory,
  AddItem,
  DeleteCategory,
  DeleteModifier,
  EditCategory,
  EditItem,
  GetCatalogueList,
  GetLocationsList,
  GetStoreCategoriesList,
  GetStoreItemList,
  GetStoreModifiersList,
  UpdateStoreURL,
} from "@/types/api-params/catalogue.params";
import {
  catalogueListResponse,
  fetchLocationResponse,
  StoreCategory,
  StoreCategoryResponse,
  StoreItem,
  StoreItemResponse,
  StoreModifierDelete,
  StoreModifierResponse,
  UpdateURLResponse,
} from "@/types/api-response/catalogue.response";

export const onGetCatalogueList: GetCatalogueList = async (params) => {
  const endpoint = `${API_BASE_URL}/catalogue/catalogues/fetch/${params.bizid}?pgStart=${params.pgStart || 0}&pgSize=${params.pgSize || 1000}`;

  return _get<catalogueListResponse>(endpoint, {
    requireAuth: true,
  });
};

export const updateStoreURL: UpdateStoreURL = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/store_url`;

  return _put<UpdateURLResponse>(endpoint, payload, {
    requireAuth: true,
  });
};

export const fetchLocations: GetLocationsList = async (params) => {
  const endpoint = `${API_BASE_URL}/catalogue/fetch_location/${params.store_url}`;

  return _get<fetchLocationResponse>(endpoint, {
    requireAuth: true,
  });
};

export const fetchStoreCategory: GetStoreCategoriesList = async (params) => {
  const endpoint = `${API_BASE_URL}/catalogue/categories/fetch/${params.bizid}?pgStart=${params.pgStart || 0}&pgSize=${params.pgSize || 1000}`;

  return _get<StoreCategoryResponse>(endpoint, {
    requireAuth: true,
    cache: "force-cache",
  });
};

export const fetchStoreItem: GetStoreItemList = async (params) => {
  const endpoint = `${API_BASE_URL}/catalogue/items/fetch/${params.bizid}?pgStart=${params.pgStart || 0}&pgSize=${params.pgSize || 1000}`;

  return _get<StoreItemResponse>(endpoint, {
    requireAuth: true,
    cache: "force-cache",
  });
};

export const fetchStoreModifier: GetStoreModifiersList = async (params) => {
  const endpoint = `${API_BASE_URL}/catalogue/modifiers/fetch/${params.bizid}?pgStart=${params.pgStart || 0}&pgSize=${params.pgSize || 1000}`;

  return _get<StoreModifierResponse>(endpoint, {
    requireAuth: true,
    cache: "force-cache",
  });
};

export const deleteModifier: DeleteModifier = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/modifier`;

  revalidatePath(ROUTES.BUSINESS_STORE_MODIFIER);
  return _delete<StoreModifierDelete>(endpoint, payload, {
    requireAuth: true,
  });
};

export const deleteItem: DeleteModifier = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/item`;

  revalidatePath(ROUTES.BUSINESS_STORE_ITEM);
  return _delete<StoreModifierDelete>(endpoint, payload, {
    requireAuth: true,
  });
};

export const deleteCategory: DeleteCategory = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/category`;

  revalidatePath(ROUTES.BUSINESS_STORE_CATEGORY);
  return _delete<StoreModifierDelete>(endpoint, payload, {
    requireAuth: true,
  });
};

export const AddCategories: AddCategory = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/categories`;

  revalidatePath(ROUTES.BUSINESS_STORE_CATEGORY);
  return _post<StoreCategory, typeof payload>(endpoint, payload, {
    requireAuth: true,
  });
};

export const EditCategories: EditCategory = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/category`;

  revalidatePath(ROUTES.BUSINESS_STORE_CATEGORY);
  return _put<StoreCategory>(endpoint, payload, {
    requireAuth: true,
  });
};

export const AddItems: AddItem = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/items`;

  revalidatePath(ROUTES.BUSINESS_STORE_ITEM);
  return _post<StoreItem, typeof payload>(endpoint, payload, {
    requireAuth: true,
  });
};

export const EditItems: EditItem = async (payload) => {
  const endpoint = `${API_BASE_URL}/catalogue/item`;

  revalidatePath(ROUTES.BUSINESS_STORE_ITEM);
  return _put<StoreItem>(endpoint, payload, {
    requireAuth: true,
  });
};
