"use server";
import { API_BASE_URL } from "@/environment";
import { _get, _put } from "@/lib/handlers/fetch";
import {
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
  StoreCategoryResponse,
  StoreItemResponse,
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
  });
};

export const fetchStoreItem: GetStoreItemList = async (params) => {
  const endpoint = `${API_BASE_URL}/catalogue/items/fetch/${params.bizid}?pgStart=${params.pgStart || 0}&pgSize=${params.pgSize || 1000}`;

  return _get<StoreItemResponse>(endpoint, {
    requireAuth: true,
  });
};

export const fetchStoreModifier: GetStoreModifiersList = async (params) => {
  const endpoint = `${API_BASE_URL}/catalogue/modifiers/fetch/${params.bizid}?pgStart=${params.pgStart || 0}&pgSize=${params.pgSize || 1000}`;

  return _get<StoreModifierResponse>(endpoint, {
    requireAuth: true,
  });
};
