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

export type DeleteModifier = (payload: {
  bizid: number;
  objid: number;
}) => Promise<ActionResponse<StoreModifierDelete>>;

export type DeleteCategory = (payload: {
  bizid: number;
  objid: number;
  description: string;
  name: string;
}) => Promise<ActionResponse<StoreModifierDelete>>;

export type AddCategory = (
  payload: Array<{
    bizid: number;
    description: string;
    name: string;
    images: string[];
    objid?: number;
  }>
) => Promise<ActionResponse<StoreCategory>>;

export type EditCategory = (payload: {
  bizid: number;
  description: string;
  name: string;
  images: string[];
  objid?: number;
}) => Promise<ActionResponse<StoreCategory>>;

export type AddItem = (
  payload: Array<{
    bizid: number;
    description: string;
    name: string;
    images: string[];
    sku: string;
    stdTax: boolean;
    taxPercent: string;
    unit: string;
  }>
) => Promise<ActionResponse<StoreItem>>;

export type EditItem = (payload: {
  bizid: number;
  description: string;
  name: string;
  images: string[];
  sku: string;
  stdTax: boolean;
  taxPercent: string;
  unit: string;
  objid?: number;
}) => Promise<ActionResponse<StoreItem>>;
