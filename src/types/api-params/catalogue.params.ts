import {
  catalogueListResponse,
  fetchLocationResponse,
  StoreCategoryResponse,
  StoreItemResponse,
  StoreModifierResponse,
  UpdateURLResponse,
} from "../api-response/catalogue.response";
import { ActionResponse } from "../global";

export type GetCatalogueList = (params: {
  bizid: number;
  pgStart?: number;
  pgSize?: number;
}) => Promise<ActionResponse<catalogueListResponse>>;

export type UpdateStoreURL = (payload: {
  catalogueId: number;
  newUrl: string;
}) => Promise<ActionResponse<UpdateURLResponse>>;

export type GetLocationsList = (params: {
  store_url: string;
}) => Promise<ActionResponse<fetchLocationResponse>>;

export type GetStoreCategoriesList = (params: {
  bizid: number;
  pgStart?: number;
  pgSize?: number;
}) => Promise<ActionResponse<StoreCategoryResponse>>;

export type GetStoreItemList = (params: {
  bizid: number;
  pgStart?: number;
  pgSize?: number;
}) => Promise<ActionResponse<StoreItemResponse>>;

export type GetStoreModifiersList = (params: {
  bizid: number;
  pgStart?: number;
  pgSize?: number;
}) => Promise<ActionResponse<StoreModifierResponse>>;
