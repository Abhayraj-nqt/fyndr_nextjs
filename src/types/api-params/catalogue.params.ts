import {
  catalogueListResponse,
  fetchLocationResponse,
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
